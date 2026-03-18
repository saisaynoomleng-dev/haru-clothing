'use client';

import { handleNewsletter } from '@/actions/newsletter';
import clsx from 'clsx';
import Form from 'next/form';
import { useActionState, useEffect } from 'react';
import { Input } from '../ui/input';
import SubmitButton from '../shared/SubmitButton';
import { toast } from 'sonner';

const initialFormState = {
  success: false,
  message: '',
};

const SubscribeToNewsletter = ({ className }: { className?: string }) => {
  const [state, actionFunction] = useActionState(
    handleNewsletter,
    initialFormState,
  );

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message);
    } else {
      toast.error(state.message);
    }
  }, [state.success, state.message]);

  return (
    <Form
      action={actionFunction}
      className={clsx(
        'flex flex-col gap-y-5 md:gap-y-10 px-5 md:px-10 newsletter-bg pb-10 md:pb-20 pt-10',
        className,
      )}
    >
      <h3 className="font-semibold text-fs-500 md:text-fs-600 text-center">
        Subscribe to our Newsletter
      </h3>

      <div className="flex gap-x-1 items-center justify-center">
        <label htmlFor="email" className="sr-only">
          Enter your email address
        </label>
        <Input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          placeholder="johndoe@example.com"
          className="max-w-100"
        />
        {!state.success ? (
          <p className="form-error-message">{state.message}</p>
        ) : null}

        <SubmitButton>Submit</SubmitButton>
      </div>
    </Form>
  );
};

export default SubscribeToNewsletter;
