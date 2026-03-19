import FAQ from '@/components/features/FAQ';
import Banner from '@/components/shared/Banner';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_FAQS_QUERY } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'FAQs',
  description:
    'Find quick answers to common questions about shipping, returns, sizing, and international orders at Haru Commerce. Everything you need to know, all in one place.',
};

const FAQsPage = async () => {
  const { data } = await sanityFetch({ query: ALL_FAQS_QUERY });

  if (!data) notFound();
  return (
    <Bounded isPaded className="min-h-fit!">
      <PageTitle
        text="Everything you need to know about Haru."
        title="Clarity & Context"
      />

      <FAQ data={data} />

      <Banner />
    </Bounded>
  );
};

export default FAQsPage;
