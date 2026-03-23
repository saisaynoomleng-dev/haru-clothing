import Bounded from '@/components/shared/Bounded';
import ColorBox from '@/components/shared/ColorBox';
import ImageCarousel from '@/components/shared/ImageCarousel';
import PageTitle from '@/components/shared/PageTitle';
import SectionTitle from '@/components/shared/SectionTitle';
import { formatPrice } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { PRODUCT_QUERY } from '@/sanity/lib/queries';
import { MyPortableText } from '@/sanity/schemaTypes/components/MyPortableText';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'product name',
  description:
    'Deep dive into the [Product Name]. Crafted with premium materials and precision detail. View sizing, styling guides, and authentic customer reviews.',
};

const ProductDetailPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ productColor?: string }>;
}) => {
  const { slug } = await params;
  const { productColor } = await searchParams;

  const { data: product } = await sanityFetch({
    query: PRODUCT_QUERY,
    params: {
      slug,
      productColor,
    },
  });

  if (!product) notFound();

  const {
    name,
    sku,
    slug: productSlug,
    basePrice,
    category,
    brand,
    variants,
    body,
    tag,
  } = product;

  if (!variants) notFound();

  const currentProduct = productColor
    ? variants.filter(
        (v) => v.color?.toLowerCase() === productColor?.toLowerCase(),
      )[0]
    : variants[0];

  const defaultImages = variants[0].images;
  const variantImages = currentProduct.images;
  const finalPrice =
    currentProduct.priceOverride === null
      ? basePrice
      : currentProduct.priceOverride;
  const variantSKU = currentProduct.sku ?? sku;

  return (
    <Bounded isPaded>
      <PageTitle
        title="The Details Matter"
        text={`A closer look at the ${name}`}
      />

      <div className="grid md:grid-cols-2 md:gap-x-5 gap-y-5">
        {/* images */}
        {productColor ? (
          <div>
            <ImageCarousel images={variantImages || []} />
          </div>
        ) : (
          <div>
            <ImageCarousel images={defaultImages || []} />
          </div>
        )}

        <div className="flex flex-col gap-y-3">
          <p className="text-brand-black/60 font-medium">{category}</p>
          <h3 className="font-semibold text-fs-500">{name}</h3>
          {finalPrice && <p>{formatPrice(finalPrice)}</p>}
          <p>
            <span className="font-semibold">Brand: </span>
            {brand}
          </p>

          <div className="flex flex-col gap-y-1">
            <p>
              <span className="font-semibold">Colors: </span>
              {currentProduct.color}
            </p>

            <div className="flex gap-x-1">
              {variants?.map((v) => (
                <Link
                  key={v.sku}
                  scroll={false}
                  href={{
                    pathname: `/shop/${productSlug}`,
                    query: {
                      productColor: v.color?.toLowerCase(),
                    },
                  }}
                >
                  <ColorBox color={v.color as string} />
                </Link>
              ))}
            </div>
          </div>

          <p>
            <span className="font-semibold">Tag: </span>
            {tag}
          </p>

          <p>
            <span className="font-semibold">SKU: </span>
            {variantSKU}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <SectionTitle text="" title="Description" />
        {body && (
          <div className="prose md:prose-lg min-w-full">
            <PortableText value={body} components={MyPortableText} />
          </div>
        )}
      </div>
    </Bounded>
  );
};

export default ProductDetailPage;
