import BlogFilter from '@/components/features/BlogFilter';
import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { BlogCardSkeleton } from '@/components/shared/Skeletons';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import {
  ALL_BLOG_CATEGORIES_QUERY,
  ALL_BLOGS_QUERY,
} from '@/sanity/lib/queries';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Blogs',
  description: `The Haru Journal: A space for design inspiration, style guides, and deep dives into the stories behind our favorite "Haru Clothing" objects.`,
};

const BlogPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; categories?: string }>;
}) => {
  const { page, categories } = await searchParams;

  const currentPage = parseInt(page || '1', 10);
  const blogPerPage = 4;
  const startIndex = (currentPage - 1) * blogPerPage;
  const endIndex = startIndex + blogPerPage;

  const { data: blogCategories } = await sanityFetch({
    query: ALL_BLOG_CATEGORIES_QUERY,
  });
  const { data } = await sanityFetch({
    query: ALL_BLOGS_QUERY,
    params: {
      startIndex,
      endIndex,
      category: categories ? categories.split(',') : [],
    },
  });

  if (!blogCategories) notFound();

  const totalPage = Math.ceil(data.total / blogPerPage);

  return (
    <Bounded isPaded>
      <PageTitle
        title="The Haru Journal"
        text="Perspectives on design, culture, and utility."
      />

      <div className="grid md:grid-cols-[auto_1fr] gap-x-5">
        <div className="flex flex-col gap-y-3">
          <p className="font-semibold">Categories</p>

          <BlogFilter categories={blogCategories} />
          {categories && (
            <Link href="/blog" className="text-red-500 underline">
              Clear Filter
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 gap-5 pl-5 border-l border-brand-black/20">
          {data.blogs.map((b) => (
            <Suspense key={b.slug} fallback={<BlogCardSkeleton />}>
              <BlogCard {...b} />
            </Suspense>
          ))}
        </div>
      </div>

      {totalPage > 1 && (
        <div className="flex gap-x-3 justify-center items-center">
          {Array.from({ length: totalPage }, (_, i) => i + 1).map((pageNum) => (
            <Button
              variant="pagination"
              asChild
              key={pageNum}
              className={clsx(
                '',
                pageNum === currentPage && 'bg-brand-pink-200 font-semibold',
              )}
            >
              <Link
                href={{
                  pathname: '/blog',
                  query: {
                    ...(categories && { categories }),
                    page: pageNum,
                  },
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

export default BlogPage;
