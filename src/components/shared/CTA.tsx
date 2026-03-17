import { CTAProps } from '@/lib/types';
import Link from 'next/link';
// import { buttonVariants } from '../ui/button';
import clsx from 'clsx';
import { MdArrowRightAlt } from 'react-icons/md';

const CTA = ({ children, className, href }: CTAProps) => {
  return (
    <Link href={href} className={''}>
      <span>{children}</span>
      <span>
        <MdArrowRightAlt />
      </span>
    </Link>
  );
};

export default CTA;
