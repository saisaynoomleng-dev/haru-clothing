import { PageTitleProps } from '@/lib/types';
import clsx from 'clsx';

const SectionTitle = ({ className, text, title }: PageTitleProps) => {
  return (
    <div className={clsx('flex flex-col', className)}>
      <p className="text-brand-black/80">{text}</p>
      <h2 className="font-semibold text-fs-500 md:text-fs-700">{title}</h2>
    </div>
  );
};

export default SectionTitle;
