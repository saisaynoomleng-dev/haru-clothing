import { BackToProps } from '@/lib/types';
import clsx from 'clsx';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

const BackTo = ({ className, children, href }: BackToProps) => {
  return (
    <Link
      href={href}
      className={clsx('flex gap-x-1 items-center group', className)}
    >
      <span className="group-hover:-translate-x-1 duration-200 transition-all">
        <FaArrowLeft size="10" />
      </span>
      <span className="group-hover:underline underline-offset-4">
        {children}
      </span>
    </Link>
  );
};

export default BackTo;
