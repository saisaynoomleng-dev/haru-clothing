import { NextRequest, NextResponse } from 'next/server';
import { parseBody } from 'next-sanity/webhook';
import { env } from '@/lib/env/env.server';
import { sanityProductWebhookPayload } from '@/lib/validations';
import db from '@/db';
import { ProductTable, ProductVariantTable } from '@/db/schema';
import { eq, sql } from 'drizzle-orm';
import { revalidateTag } from 'next/cache';

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    const { isValidSignature, body } = await parseBody<any>(
      req,
      env.SANITY_PRODUCT_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid Signaure' },
        { status: 401 },
      );
    }

    const result = sanityProductWebhookPayload.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid Paybload Body' },
        { status: 422 },
      );
    }

    const {
      _id,
      name,
      brand,
      sku,
      slug,
      basePrice,
      imageUrl,
      stock,
      status,
      variants,
    } = result.data;

    if (operation === 'delete') {
      await db
        .update(ProductTable)
        .set({
          isDeleted: true,
        })
        .where(eq(ProductTable.sanityId, _id));

      return NextResponse.json(
        { message: 'Product Marked Deleted' },
        { status: 200 },
      );
    }

    await db.transaction(async (tx) => {
      const [insertedProduct] = await tx
        .insert(ProductTable)
        .values({
          sanityId: _id,
          sanitySlug: slug,
          sku,
          brand,
          name,
          basePriceInCents: Math.round(basePrice * 100),
          imageUrl,
          numberInStock: stock,
          status,
        })
        .onConflictDoUpdate({
          target: ProductTable.sanityId,
          set: {
            brand,
            name,
            basePriceInCents: Math.round(basePrice * 100),
            imageUrl,
            numberInStock: stock,
            status,
            updatedAt: new Date(),
          },
        })
        .returning({ id: ProductTable.id });

      const dbProductId = insertedProduct.id;

      if (variants?.length) {
        const variantValues = variants.map((v) => ({
          originalProductId: dbProductId,
          sku: v.sku,
          basePriceInCents: v.priceOverride
            ? Math.round(v.priceOverride * 100)
            : Math.round(basePrice * 100),
          imageUrl: v.imageUrl,
          numberInStock: v.stock,
          color: v.color,
          fit: v.fit ? v.fit : null,
          size: v.size ? v.size : null,
        }));

        await tx
          .insert(ProductVariantTable)
          .values(variantValues)
          .onConflictDoUpdate({
            target: ProductVariantTable.sku,
            set: {
              basePriceInCents: sql`excluded.base_price_in_cents`,
              numberInStock: sql`excluded.number_in_stock`,
              imageUrl: sql`excluded.image_url`,
              updatedAt: new Date(),
            },
          });

        return NextResponse.json(
          { message: 'Product Added Successfully' },
          { status: 200 },
        );
      }
    });

    return NextResponse.json(
      { message: 'Product Added Successfully' },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
