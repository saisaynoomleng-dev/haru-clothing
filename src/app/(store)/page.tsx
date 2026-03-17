import Banner from '@/components/shared/Banner';
import CTA from '@/components/shared/CTA';
import SubmitButton from '@/components/shared/SubmitButton';
import { Button } from '@/components/ui/button';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Home',
  description:
    'Elevate your everyday with Haru Commerce. Discover a curated collection of minimalist essentials, premium streetwear, and "Life Etc" objects designed for modern living.',
};

export default function Home() {
  return (
    <main>
      <Banner />
      <CTA href="/">Go TO</CTA>
    </main>
  );
}
