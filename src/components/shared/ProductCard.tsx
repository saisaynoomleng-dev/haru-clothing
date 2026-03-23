import { ProductCardProps } from '@/lib/types';
import Link from 'next/link';
import MySanityImage from './MySanityImage';
import { formatPrice } from '@/lib/formatter';
import clsx from 'clsx';

const ProductCard = ({ className, ...props }: ProductCardProps) => {
  const { slug, name, basePrice, imageUrl, category, imageAlt } = props;

  return (
    <Link
      href={`/shop/${slug}`}
      className={clsx('flex flex-col h-80 gap-y-3', className)}
    >
      <div className="overflow-hidden">
        {imageUrl && imageAlt ? (
          <MySanityImage
            src={imageUrl}
            alt={imageAlt || ''}
            className="hover:scale-[1.02] min-w-full"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-y-1">
        <p className="text-fs-300 text-brand-black/80 font-semibold">
          {category}
        </p>
        <p className="font-semibold truncate">{name}</p>
        {basePrice && <p>{formatPrice(basePrice)}</p>}
      </div>
    </Link>
  );
};

export default ProductCard;
