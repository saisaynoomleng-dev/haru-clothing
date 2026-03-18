'use client';

import { StoreFilterProps } from '@/lib/types';
import { Checkbox } from '../ui/checkbox';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { addDashInSpace } from '@/lib/formatter';

const StoreFilter = ({ countries, continents }: StoreFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const handleFilterChange = (key: 'country' | 'continent', value: string) => {
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

    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  };

  const isChecked = (key: string, value: string) => {
    return searchParams.get(key)?.split(',').includes(value) || false;
  };

  return (
    <div>
      {/* desktop view */}
      <aside className="md:flex flex-col gap-y-3 hidden">
        <div className="flex flex-col">
          <p className="font-semibold">Countries</p>
          <ul>
            {countries.map((c) => (
              <li key={c} className="text-fs-300 flex gap-x-1 items-center">
                <Checkbox
                  id={c}
                  checked={isChecked('country', c)}
                  onCheckedChange={() => handleFilterChange('country', c)}
                />
                <label htmlFor={c}>{c}</label>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col">
          <p className="font-semibold">Continents</p>
          <ul>
            {continents.map((c) => (
              <li key={c} className="text-fs-300 flex gap-x-1 items-center">
                <Checkbox
                  id={c}
                  checked={isChecked(
                    'continent',
                    addDashInSpace(c.toLowerCase()),
                  )}
                  onCheckedChange={() =>
                    handleFilterChange(
                      'continent',
                      addDashInSpace(c.toLowerCase()),
                    )
                  }
                />
                <label htmlFor={c}>{c}</label>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* mobile view */}
    </div>
  );
};

export default StoreFilter;
