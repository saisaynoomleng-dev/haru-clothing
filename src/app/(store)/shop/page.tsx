import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import ProductCard from '@/components/shared/ProductCard';
import { ProductCardSkeleton } from '@/components/shared/Skeletons';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_PRODUCTS_QUERY } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Shop',
  description:
    'Browse the full Haru collection. From seasonal drops to timeless wardrobe staples, find the perfect balance of form and function. Free shipping on orders over $150.',
};

const ShopPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;

  const currentPage = parseInt(page || '1');
  const productPerPage = 3;
  const startIndex = (currentPage - 1) * productPerPage;
  const endIndex = startIndex + productPerPage;

  const { data } = await sanityFetch({
    query: ALL_PRODUCTS_QUERY,
    params: {
      startIndex,
      endIndex,
    },
  });

  const totalPage = Math.ceil(data.total / productPerPage);

  return (
    <Bounded isPaded>
      <PageTitle
        title="The Full Collection"
        text="Curated essentials for the modern wardrobe."
      />

      <div className="grid gap-5 grid-cols-3">
        {data.products.map((p) => (
          <Suspense key={p.slug} fallback={<ProductCardSkeleton />}>
            <ProductCard {...p} />
          </Suspense>
        ))}
      </div>

      {totalPage > 1 && (
        <div className="flex gap-x-2 justify-center items-center">
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
            <Button variant="pagination" asChild key={pageNum}>
              <Link
                key={pageNum}
                href={{
                  pathname: '/shop',
                  query: { page: pageNum },
                }}
              >
                {pageNum}
              </Link>
            </Button>
          ))}
        </div>
      )}
    </Bounded>
  );
};

export default ShopPage;
