import StoreFilter from '@/components/features/StoreFilter';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { StoreCardSkeleton } from '@/components/shared/Skeletons';
import StoreCard from '@/components/shared/StoreCard';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_STORES_QUERY } from '@/sanity/lib/queries';
import clsx from 'clsx';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Store Finders',
  description: `Find a Haru store near you. Explore our global locations from Tokyo to New York, view opening hours, and experience "Life Etc" in person.`,
};

const countries = [
  'Canada',
  'USA',
  'Argentina',
  'Denmark',
  'Italy',
  'Germany',
  'Spain',
  'Japan',
  'South Korea',
  'Singapore',
].sort();

const continents = ['North America', 'South America', 'Europe', 'Asia'].sort();

const StoreFinderPage = async ({
  searchParams,
}: {
  searchParams: Promise<{
    page?: string;
    country?: string;
    continent?: string;
  }>;
}) => {
  const { page, country, continent } = await searchParams;
  const currentPage = Number(page || '1');
  const storePerPage = 4;
  const startIndex = (currentPage - 1) * storePerPage;
  const endIndex = startIndex + storePerPage;

  const { data } = await sanityFetch({
    query: ALL_STORES_QUERY,
    params: {
      startIndex,
      endIndex,
      country: country ? country.split(',') : [],
      continent: continent ? continent.toLowerCase().split(',') : [],
    },
  });

  if (!data) notFound();

  const totalPages = Math.ceil(data.total / storePerPage);

  return (
    <Bounded isPaded>
      <PageTitle
        title="Haru Global"
        text="Visit us in person at our flagship locations."
        className="col-span-full"
      />

      <div className="grid md:grid-cols-[auto_1fr] md:gap-x-10">
        <StoreFilter countries={countries} continents={continents} />

        <div className="grid md:grid-cols-2 gap-5 md:border-l border-brand-black/20 md:pl-5">
          {data.stores.map((store) => (
            <Suspense key={store.slug} fallback={<StoreCardSkeleton />}>
              <StoreCard {...store} />
            </Suspense>
          ))}
        </div>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-x-5">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <Button
                variant="pagination"
                asChild
                key={pageNumber}
                className={clsx(
                  currentPage === pageNumber
                    ? 'bg-brand-pink-200 text-brand-white'
                    : 'bg-brand-pink-100/50',
                )}
              >
                <Link
                  href={{
                    pathname: '/stores',
                    query: {
                      ...(continent && { continent }),
                      ...(country && { country }),
                      page: pageNumber,
                    },
                  }}
                >
                  {pageNumber}
                </Link>
              </Button>
            ),
          )}
        </div>
      )}
    </Bounded>
  );
};

export default StoreFinderPage;
