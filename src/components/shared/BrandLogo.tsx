import clsx from 'clsx';

const BrandLogo = ({ className }: { className?: string }) => {
  return (
    <h2 className={clsx('font-bold font-caveat text-fs-600', className)}>
      Haru.
    </h2>
  );
};

export default BrandLogo;
