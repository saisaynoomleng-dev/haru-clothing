'use client';

import { BlogFilterProps } from '@/lib/types';
import { Checkbox } from '../ui/checkbox';
import clsx from 'clsx';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

const BlogFilter = ({ className, categories }: BlogFilterProps) => {
  if (categories.length === 0) return;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isChecked = (key: string, value: string) => {
    return searchParams.get(key)?.split(',').includes(value) || false;
  };

  const handleCheck = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const currentValues = params.get(key)?.split(',') || [];

    let newValues;

    if (currentValues.includes(value)) {
      newValues = currentValues.filter((v) => v !== value);
    } else {
      newValues = [...currentValues, value];
    }

    if (newValues.length > 0) {
      params.set(key, newValues.join(','));
    } else {
      params.delete(key);
    }

    params.delete('page');

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <ul className={clsx('flex flex-col gap-y-1', className)}>
      {categories
        .filter((v) => v.slug !== 'runway-blog-category')
        .map((c) => (
          <li key={c.slug} className="flex gap-x-1 items-center">
            <Checkbox
              id={c.slug as string}
              checked={isChecked('categories', c.slug as string)}
              onCheckedChange={() =>
                handleCheck('categories', c.slug?.toLowerCase() as string)
              }
            />
            <label htmlFor={c.slug as string} className="cursor-pointer">
              {c.name}
            </label>
          </li>
        ))}
    </ul>
  );
};

export default BlogFilter;
