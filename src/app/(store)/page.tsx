import SubscribeToNewsletter from '@/components/features/SubscribeToNewsletter';
import Banner from '@/components/shared/Banner';
import BlogCard from '@/components/shared/BlogCard';
import Bounded from '@/components/shared/Bounded';
import CTA from '@/components/shared/CTA';
import MemberCard from '@/components/shared/MemberCard';
import ProductCard from '@/components/shared/ProductCard';
import {
  BlogCardSkeleton,
  MemberCardSkeleton,
  ProductCardSkeleton,
} from '@/components/shared/Skeletons';
import SubmitButton from '@/components/shared/SubmitButton';
import { Button } from '@/components/ui/button';
import { sanityFetch } from '@/sanity/lib/live';
import {
  ALL_BLOGS_QUERY,
  ALL_MEMBERS_QUERY,
  ALL_PRODUCTS_QUERY,
} from '@/sanity/lib/queries';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Elevate your everyday with Haru Commerce. Discover a curated collection of minimalist essentials, premium streetwear, and "Life Etc" objects designed for modern living.',
};

export default async function Home() {
  const { data } = await sanityFetch({
    query: ALL_MEMBERS_QUERY,
  });
  return (
    <Bounded>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eius maiores,
        ipsam animi accusantium dolorem corporis earum rerum ullam nemo, a quasi
        tempore odio voluptatibus laboriosam impedit mollitia eum exercitationem
        culpa ducimus suscipit. Nesciunt, facere vitae. Maxime ab voluptatem ad
        commodi autem exercitationem dolore, mollitia molestiae reprehenderit
        eligendi optio accusantium facere?
      </p>

      <SubscribeToNewsletter />
    </Bounded>
  );
}
