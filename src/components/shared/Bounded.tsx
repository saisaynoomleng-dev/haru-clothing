import { BoundedProps } from '@/lib/types';
import clsx from 'clsx';

const Bounded = ({
  children,
  className,
  isPaded,
  as: Comp = 'section',
}: BoundedProps) => {
  return (
    <Comp
      className={clsx(
        'space-y-10 md:space-y-14 lg:space-y-18 py-8 md:py-10 lg:py-12 min-h-screen lg:max-w-300 lg:mx-auto',
        isPaded && 'px-5 md:px-10 lg:px-12',
        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Bounded;
