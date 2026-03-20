import BackTo from '@/components/shared/BackTo';
import Bounded from '@/components/shared/Bounded';
import MySanityImage from '@/components/shared/MySanityImage';
import PageTitle from '@/components/shared/PageTitle';
import { formatDate } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { BLOG_QUERY } from '@/sanity/lib/queries';
import { MyPortableText } from '@/sanity/schemaTypes/components/MyPortableText';
import { Metadata } from 'next';
import { PortableText } from 'next-sanity';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'blog detail',
  description: `Read "[Article Title]" on the Haru Journal. Explore the intersection of minimalist design and modern culture through our latest editorial feature.`,
};

const BlogDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: blog } = await sanityFetch({
    query: BLOG_QUERY,
    params: await params,
  });

  if (!blog) notFound();

  const {
    imageUrl,
    imageAlt,
    name,
    body,
    slug,
    minRead,
    author,
    category,
    publishedAt,
  } = blog;

  return (
    <Bounded isPaded>
      <PageTitle title="" text={name as string} />
      <BackTo href="/blog">Back to All Blogs</BackTo>

      <div>
        {imageAlt && imageUrl ? (
          <MySanityImage src={imageUrl} alt={imageAlt} className="mx-auto" />
        ) : null}
      </div>

      <div className="flex flex-col gap-y-3 justify-center items-center">
        <p className="bg-brand-blue px-2 py-1 rounded-2xl text-brand-white">
          {category}
        </p>
        <h3 className="font-semibold text-fs-500 md:text-fs-600">{name}</h3>
        <p>
          Written by{' '}
          <Link
            href={`/author/${author?.slug}`}
            className="underline underline-offset-4 text-brand-pink-200 font-semibold"
          >
            {author?.name}
          </Link>
        </p>

        {publishedAt && (
          <p>
            <span className="text-brand-black/80">Published On </span>
            {formatDate(publishedAt)}
            <span className="text-brand-black/80"> | </span>
            {minRead}
            <span className="text-brand-black/80"> min read</span>
          </p>
        )}
      </div>

      {body && (
        <div className="prose md:prose-lg lg:prose-xl min-w-full">
          <PortableText value={body} components={MyPortableText} />
        </div>
      )}
    </Bounded>
  );
};

export default BlogDetailPage;
