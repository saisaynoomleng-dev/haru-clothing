import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { Button } from '@/components/ui/button';
import { formatTitle, removeDash } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_CAREERS_QUERY } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const metadat: Metadata = {
  title: 'Careers',
  description: ``,
};

const CareerPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) => {
  const { page } = await searchParams;
  const currentPage = parseInt(page || '1', 10);
  const totalPositionsPerPage = 6;
  const startIndex = (currentPage - 1) * totalPositionsPerPage;
  const endIndex = startIndex + totalPositionsPerPage;

  const { data } = await sanityFetch({
    query: ALL_CAREERS_QUERY,
    params: {
      startIndex,
      endIndex,
    },
  });

  if (!data) notFound();

  const totalPages = Math.ceil(data.total / totalPositionsPerPage);

  return (
    <Bounded isPaded>
      <PageTitle title="Job Positions" text="" />

      <div className="grid grid-cols-2 gap-4 ">
        {data.careers.map((c) => (
          <Link
            href={`/career/${c.slug}`}
            key={c.slug}
            className="shadow flex flex-col gap-y-3 p-2 hover:scale-[1.01] duration-200 transition-all"
          >
            <p className="font-semibold">{c.name}</p>
            {c.department && (
              <p>
                Department:{' '}
                <span className="font-semibold">
                  {formatTitle(removeDash(c.department))}
                </span>
              </p>
            )}
          </Link>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-x-3">
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNum) => (
              <Button asChild key={pageNum} variant="pagination">
                <Link
                  href={{
                    pathname: '/career',
                    query: {
                      page: pageNum,
                    },
                  }}
                >
                  {pageNum}
                </Link>
              </Button>
            ),
          )}
        </div>
      )}
    </Bounded>
  );
};

export default CareerPage;
