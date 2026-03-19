import { MemberCardProps } from '@/lib/types';
import clsx from 'clsx';
import MySanityImage from './MySanityImage';

const MemberCard = ({ className, ...props }: MemberCardProps) => {
  const { name, position, imageUrl, imageAlt } = props;

  return (
    <div className={clsx('flex flex-col gap-y-3')}>
      <div className="overflow-hidden">
        {imageAlt && imageUrl ? (
          <MySanityImage
            src={imageUrl}
            alt={imageAlt || ''}
            className="w-full h-60"
          />
        ) : null}
      </div>

      <div className="flex flex-col gap-y-2">
        <p className="font-semibold">{name}</p>
        <p className="font-semibold text-fs-300 text-brand-black/80">
          {position}
        </p>
      </div>
    </div>
  );
};

export default MemberCard;
