import Bounded from '@/components/shared/Bounded';
import { sanityFetch } from '@/sanity/lib/live';
import { CAREER_QUERY } from '@/sanity/lib/queries';

const CareerDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: career } = await sanityFetch({ query: CAREER_QUERY });
  return <Bounded isPaded>CareerDetailPage</Bounded>;
};

export default CareerDetailPage;
