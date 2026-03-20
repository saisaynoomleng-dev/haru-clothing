import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import ProductCard from '@/components/shared/ProductCard';
import {
  BlogCardSkeleton,
  ProductCardSkeleton,
} from '@/components/shared/Skeletons';
import { sanityFetch } from '@/sanity/lib/live';
import {
  SEARCH_BLOGS_QUERY,
  SEARCH_PRODUCTS_QUERY,
} from '@/sanity/lib/queries';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Search',
  description:
    'Searching for [Query]? Explore the best of Haru Commerce. Find exactly what you need from our curated catalog of premium goods and accessories.',
};

const SearchPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  const { query } = await searchParams;

  const params = {
    search: query?.toLowerCase() || '',
  };

  const [{ data: products }, { data: blogs }] = await Promise.all([
    sanityFetch({ query: SEARCH_PRODUCTS_QUERY, params }),
    sanityFetch({ query: SEARCH_BLOGS_QUERY, params }),
  ]);

  return (
    <Bounded isPaded>
      <p className="font-semibold text-fs-500 md:text-fs-600">
        Search result for '{query}'
      </p>

      {products.length > 0 && (
        <div className="flex flex-col gap-y-3">
          <h2 className="font-semibold">Products</h2>

          <div className="grid grid-cols-3 gap-3">
            {products.map((p) => (
              <Suspense fallback={<ProductCardSkeleton />} key={p.slug}>
                <ProductCard {...p} />
              </Suspense>
            ))}
          </div>
        </div>
      )}

      {blogs.length > 0 && (
        <div className="flex flex-col gap-y-3">
          <h2 className="font-semibold">Blogs</h2>

          <div className="grid grid-cols-3 gap-3">
            {blogs.map((b) => (
              <Suspense fallback={<BlogCardSkeleton />} key={b.slug}>
                <BlogCard {...b} />
              </Suspense>
            ))}
          </div>
        </div>
      )}
    </Bounded>
  );
};

export default SearchPage;
