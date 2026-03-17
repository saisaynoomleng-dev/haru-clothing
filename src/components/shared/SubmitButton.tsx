'use client';

import { useFormStatus } from 'react-dom';
import { Button } from '../ui/button';
import { LoadingSpinner } from './LoadingSpinner';
import clsx from 'clsx';
import { SubmitButtonProps } from '@/lib/types';

const SubmitButton = ({ children, className }: SubmitButtonProps) => {
  const { pending } = useFormStatus();

  return (
    <Button className={clsx('', className)}>
      {pending ? (
        <span>
          <LoadingSpinner />
        </span>
      ) : (
        <span>{children}</span>
      )}
    </Button>
  );
};

export default SubmitButton;
