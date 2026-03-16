import db from '@/db';
import { CareerTable } from '@/db/schema';
import { env } from '@/lib/env/env.server';
import { sanityCareerWebhookPayload } from '@/lib/validations';
import { eq } from 'drizzle-orm';
import { parseBody } from 'next-sanity/webhook';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const operation = req.headers.get('sanity-operation');

    const { isValidSignature, body } = await parseBody<any>(
      req,
      env.SANITY_CAREER_WEBHOOK_SECRET,
    );

    if (!isValidSignature) {
      return NextResponse.json(
        { message: 'Invalid Signature' },
        { status: 401 },
      );
    }

    const result = sanityCareerWebhookPayload.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { message: 'Invalid Enitity Body' },
        { status: 422 },
      );
    }

    const { _id, name, slug } = result.data;

    if (operation === 'delete') {
      await db
        .update(CareerTable)
        .set({
          isOpen: false,
          isDeleted: true,
          updatedAt: new Date(),
        })
        .where(eq(CareerTable.sanityId, _id));

      return NextResponse.json(
        { message: 'Career Marked Deleted' },
        { status: 200 },
      );
    }

    await db
      .insert(CareerTable)
      .values({
        name,
        sanityId: _id,
        isOpen: true,
        sanitySlug: slug,
      })
      .onConflictDoUpdate({
        target: CareerTable.sanityId,
        set: {
          isOpen: true,
          updatedAt: new Date(),
        },
      });

    return NextResponse.json({ message: 'Added Career' }, { status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
