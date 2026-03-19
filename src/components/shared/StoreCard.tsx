import { StoreCardProps } from '@/lib/types';
import clsx from 'clsx';
import Link from 'next/link';
import MySanityImage from './MySanityImage';
import { GrLocationPin } from 'react-icons/gr';

const StoreCard = ({ className, ...props }: StoreCardProps) => {
  const { name, slug, imageUrl, imageAlt, country, city } = props;

  return (
    <Link
      href={`/stores/${slug}`}
      className={clsx('group flex flex-col gap-y-3 shadow p-2', className)}
    >
      <div className="overflow-hidden">
        {imageAlt && imageUrl ? (
          <MySanityImage
            src={imageUrl}
            alt={imageAlt || ''}
            className="group-hover:scale-[1.01] transition-all duration-200 ease-in-out w-full"
          />
        ) : null}
      </div>

      <div className="flex justify-between items-center font-semibold text-fs-300">
        <p className="text-fs-400">{name}</p>
        <p className="flex gap-x-1 items-center">
          <span>
            <GrLocationPin />
          </span>
          {city}, {country}
        </p>
      </div>
    </Link>
  );
};

export default StoreCard;
