import Bounded from '@/components/shared/Bounded';
import { sanityFetch } from '@/sanity/lib/live';
import { UTILITY_PAGE_QUERY } from '@/sanity/lib/queries';
import { MyPortableText } from '@/sanity/schemaTypes/components/MyPortableText';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';

const params = {
  slug: 'terms-conditions-utility-page',
};

const { data: page } = await sanityFetch({ query: UTILITY_PAGE_QUERY, params });

if (!page) notFound();

const UserTermsAndConditionPage = () => {
  return (
    <Bounded isPaded>
      {page.body && (
        <div className="prose md:prose-lg lg:prose-xl min-w-full">
          <PortableText value={page.body} components={MyPortableText} />
        </div>
      )}
    </Bounded>
  );
};

export default UserTermsAndConditionPage;
