import Bounded from '@/components/shared/Bounded';
import MemberCard from '@/components/shared/MemberCard';
import PageTitle from '@/components/shared/PageTitle';
import SectionTitle from '@/components/shared/SectionTitle';
import { MemberCardSkeleton } from '@/components/shared/Skeletons';
import { sanityFetch } from '@/sanity/lib/live';
import { ALL_MEMBERS_QUERY } from '@/sanity/lib/queries';
import { Metadata } from 'next';
import Image from 'next/image';
import { Suspense } from 'react';
import { FaCottonBureau, FaDotCircle } from 'react-icons/fa';
import { LuWind } from 'react-icons/lu';

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'The story of Haru. Born from a desire for intentional design and high-quality craftsmanship, we build products that last a lifetime. Meet the team behind "Haru Clothing"',
};

const AboutUsPage = async () => {
  const { data } = await sanityFetch({ query: ALL_MEMBERS_QUERY });

  return (
    <Bounded isPaded>
      <PageTitle
        title="Our Narrative"
        text="Defining the future of Haru Clothing."
      />

      <div className="flex flex-col gap-y-3 justify-center items-center text-center">
        <SectionTitle
          text="Our Story"
          title="Crafted with Care: Fine Materials, Thoughtful Design"
        />

        <div className="space-y-1 text-fs-300 md:text-fs-400">
          <p>
            At our core, this brand was never just about clothing — it was about
            identity.
          </p>
          <p>
            I started this journey with a simple belief: what you wear should
            reflect who you are, not who the world expects you to be. Every
            piece we create is designed with intention — to give you confidence,
            comfort, and a sense of belonging in your own story.
          </p>
          <p>
            We obsess over quality because you deserve garments that last. We
            care about design because style is a language. And above all, we
            stay true to our values because trust is everything.
          </p>
          <p>
            This brand is built for individuals who move with purpose, think
            independently, and aren&apos;t afraid to stand out. You&apos;re not
            just wearing our clothes — you&apos;re carrying the mindset behind
            them.
          </p>
          <p>Thank you for being part of this journey.</p>
          <p className="font-caveat text-fs-600 md:text-fs-700">Haru</p>
          <p className="flex items-center gap-x-2 justify-center">
            Haru <FaDotCircle className="size-2 text-brand-pink-200" /> CEO
          </p>
        </div>
      </div>

      <div className="divider"></div>

      <div className="flex gap-x-5 max-md:flex-col max-md:gap-y-5">
        <div className="flex-1">
          <Image src="/about-us.jpg" alt="" width={400} height={600} />
        </div>
        <div className="flex flex-col justify-center gap-y-3 flex-2">
          <p className="text-brand-black/80">Our Product Quality</p>
          <h3 className="font-semibold text-fs-500 md:text-fs-600">
            We Make Things Comfy, Pretty, and Fancy
          </h3>

          <p className="text-fs-300 ">
            Each piece is crafted with premium materials and a focus on everyday
            wearability, blending timeless design with modern detail. From
            fabric selection to final stitching, we prioritize durability,
            comfort, and fit—so every product not only looks good but feels
            right, day after day.
          </p>

          <div className="grid grid-cols-2 gap-x-3 text-fs-300 text-brand-black/80">
            <div className="flex flex-col gap-y-1 justify-center items-center border p-3 rounded-sm">
              <p>
                <FaCottonBureau className="size-5" />
              </p>
              <p>100% Cotton</p>
            </div>
            <div className="flex flex-col gap-y-1 justify-center items-center border p-3 rounded-sm">
              <p>
                <LuWind className="size-5" />
              </p>
              <p>Breathable Fabric</p>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-y-3">
        <SectionTitle
          text="Our Team"
          title="Meet Our Team"
          className="justify-center items-center"
        />

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 mt-5">
          {data.members.map((m) => (
            <Suspense key={m.slug} fallback={<MemberCardSkeleton />}>
              <MemberCard {...m} />
            </Suspense>
          ))}
        </div>
      </div>
    </Bounded>
  );
};

export default AboutUsPage;
