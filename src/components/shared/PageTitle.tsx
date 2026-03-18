import { PageTitleProps } from '@/lib/types';
import clsx from 'clsx';

const PageTitle = ({ title, text, className }: PageTitleProps) => {
  return (
    <div
      className={clsx(
        'page-title-bg flex flex-col justify-center items-center py-5 md:py-10 font-playfair',
        className,
      )}
    >
      <h2 className="font-semibold text-fs-500 md:text-fs-600">{title}</h2>
      <p className="text-brand-black/80 font-medium">{text}</p>
    </div>
  );
};

export default PageTitle;
