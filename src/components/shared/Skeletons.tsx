import { Skeleton } from '../ui/skeleton';

// Product Card
export const ProductCardSkeleton = () => {
  return (
    <div className="space-y-3 w-80 h-80">
      <Skeleton className="w-80 h-50" />
      <div className="space-y-2">
        <Skeleton className="w-80 h-3" />
        <Skeleton className="w-80 h-3" />
        <Skeleton className="w-80 h-3" />
      </div>
    </div>
  );
};

// Blog Card
export const BlogCardSkeleton = () => {
  return (
    <div className="space-y-3 w-80 h-80">
      <Skeleton className="w-80 h-50" />
      <div className="space-y-2">
        <Skeleton className="w-80 h-3" />
        <Skeleton className="w-80 h-3" />
        <Skeleton className="w-80 h-3" />
        <Skeleton className="w-80 h-3" />
      </div>
    </div>
  );
};

// Member Card
export const MemberCardSkeleton = () => {
  return (
    <div className="space-y-3 w-80 h-80">
      <Skeleton className="w-80 h-60" />
      <div className="space-y-2">
        <Skeleton className="w-80 h-3" />
        <Skeleton className="w-80 h-3" />
      </div>
    </div>
  );
};
