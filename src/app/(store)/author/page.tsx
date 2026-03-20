import AuthorCard from '@/components/shared/AuthorCard';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { AuthorCardSkeleton } from '@/components/shared/Skeletons';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_AUTHORS_QUERY } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Authors',
  description: `Explore the perspective of [Author Name]. View their latest contributions to the Haru Journal and discover their unique take on design and lifestyle.`,
};

const AuthorsPage = async () => {
  const { data: authors } = await sanityFetch({ query: ALL_AUTHORS_QUERY });

  return (
    <Bounded isPaded>
      <PageTitle
        title="Curated by Our Authors"
        text="Exploring the voice behind the story."
      />

      <div className="grid grid-cols-2 gap-5">
        {authors.map((a) => (
          <Suspense key={a.slug} fallback={<AuthorCardSkeleton />}>
            <AuthorCard {...a} />
          </Suspense>
        ))}
      </div>
    </Bounded>
  );
};

export default AuthorsPage;
