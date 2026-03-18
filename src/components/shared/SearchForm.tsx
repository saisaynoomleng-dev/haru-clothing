'use client';

import Form from 'next/form';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import clsx from 'clsx';

const SearchForm = ({ className }: { className?: string }) => {
  const [text, setText] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  return (
    <Form
      onSubmit={() => setText('')}
      action="/search"
      className={clsx('flex gap-x-3', className)}
    >
      <div className="relative w-full">
        <label htmlFor="search-form" className="sr-only">
          Search Anything
        </label>
        <Input
          type="text"
          value={text}
          name="query"
          id="search-form"
          onChange={handleChange}
        />
        {text && (
          <button
            type="button"
            className="absolute right-1 top-[50%] -translate-y-[50%] cursor-pointer"
            onClick={() => setText('')}
          >
            <IoClose />
          </button>
        )}
      </div>
      <Button disabled={text ? false : true}>Search</Button>
    </Form>
  );
};

export default SearchForm;
