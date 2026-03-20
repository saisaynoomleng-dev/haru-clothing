import { AuthorCardProps } from '@/lib/types';
import Link from 'next/link';
import MySanityImage from './MySanityImage';
import clsx from 'clsx';

const AuthorCard = ({ className, ...props }: AuthorCardProps) => {
  const { name, slug, imageUrl, imageAlt } = props;

  return (
    <Link
      href={`/author/${slug}`}
      className={clsx('group shadow p-2 flex flex-col gap-y-3', className)}
    >
      <div className="overflow-hidden">
        {imageUrl && imageAlt ? (
          <MySanityImage
            src={imageUrl}
            alt={imageAlt || ''}
            className="group-hover:scale-[1.01] duration-200 transition-all w-full"
          />
        ) : null}
      </div>

      <p>{name}</p>
    </Link>
  );
};

export default AuthorCard;
