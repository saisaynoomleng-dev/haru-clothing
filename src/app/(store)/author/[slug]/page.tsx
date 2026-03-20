import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import MySanityImage from '@/components/shared/MySanityImage';
import PageTitle from '@/components/shared/PageTitle';
import SectionTitle from '@/components/shared/SectionTitle';
import { BlogCardSkeleton } from '@/components/shared/Skeletons';
import { formatTitle, removeDash } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { AUTHOR_QUERY } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';
import { CiInstagram } from 'react-icons/ci';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const slugFormatted = formatTitle(removeDash(slug));

  return {
    title: slugFormatted,
    description: ``,
  };
}

const AuthorDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data } = await sanityFetch({
    query: AUTHOR_QUERY,
    params: await params,
  });

  if (!data || !data.author) notFound();

  return (
    <Bounded isPaded>
      <PageTitle title={data.author.name as string} text="" />

      <div className="grid grid-cols-2 gap-x-5">
        <div>
          {data.author.imageUrl && (
            <MySanityImage
              src={data.author.imageUrl}
              alt={data.author.imageAlt || ''}
              className="w-80 h-80 rounded-full"
            />
          )}
        </div>

        <div className="flex flex-col gap-y-3 justify-center">
          <p className="font-semibold text-fs-500 md:text-fs-600">
            {data.author.name}
          </p>
          <p>{data.author.body}</p>
          <Link
            href={data.author.socialLink as string}
            className="inline-block self-start p-1 rounded-full border border-brand-black hover:scale-[1.04] duration-200 transition-all"
          >
            <span>
              <CiInstagram />
            </span>
          </Link>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex flex-col gap-y-3">
        <SectionTitle title="Written Articles" text="" />

        <div className="grid grid-cols-2 gap-3">
          {data.blogs.map((b, i) => (
            <Suspense fallback={<BlogCardSkeleton />} key={i}>
              <BlogCard {...b} />
            </Suspense>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AuthorDetail;
