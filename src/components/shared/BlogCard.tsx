import { BlogCardProps } from '@/lib/types';
import MySanityImage from './MySanityImage';
import clsx from 'clsx';
import { formatDate } from '@/lib/formatter';
import CTA from './CTA';

const BlogCard = ({ className, ...props }: BlogCardProps) => {
  const { name, slug, publishedAt, imageUrl, imageAlt, category, author } =
    props;

  return (
    <div className={clsx('w-80 h-70 flex flex-col gap-y-3', className)}>
      <div className="overflow-hidden relative">
        {imageUrl && imageAlt ? (
          <MySanityImage
            src={imageUrl}
            alt={imageAlt || ''}
            className="w-full"
          />
        ) : null}

        <div className="absolute right-0 bottom-0 bg-brand-white pt-1 pl-1 text-fs-300">
          {publishedAt && (
            <p className="bg-brand-yellow p-1">{formatDate(publishedAt)}</p>
          )}
        </div>
      </div>

      <div className="flex flex-col gap-y-2">
        <div className="flex justify-between items-center text-fs-300 text-brand-black/80 font-semibold">
          <p>{category}</p>
          <p>
            by <span className="text-brand-black">{author}</span>
          </p>
        </div>
        <p className="font-semibold truncate">{name}</p>
        <CTA href={`/blog/${slug}`} className="self-end">
          Read More
        </CTA>
      </div>
    </div>
  );
};

export default BlogCard;
