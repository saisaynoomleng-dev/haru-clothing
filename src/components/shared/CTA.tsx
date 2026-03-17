import { CTAProps } from '@/lib/types';
import Link from 'next/link';
import clsx from 'clsx';
import { MdArrowRightAlt } from 'react-icons/md';
import { Button } from '../ui/button';

const CTA = ({ children, className, href }: CTAProps) => {
  return (
    <Button variant="link" asChild className={clsx('', className)}>
      <Link href={href} className="group">
        <span>{children}</span>
        <span className="group-hover:translate-x-1 transition-all duration-200">
          <MdArrowRightAlt />
        </span>
      </Link>
    </Button>
  );
};

export default CTA;
