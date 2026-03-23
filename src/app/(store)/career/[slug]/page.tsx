import BackTo from '@/components/shared/BackTo';
import Bounded from '@/components/shared/Bounded';
import { formatTitle, removeDash } from '@/lib/formatter';
import { sanityFetch } from '@/sanity/lib/live';
import { CAREER_QUERY } from '@/sanity/lib/queries';
import { MyPortableText } from '@/sanity/schemaTypes/components/MyPortableText';
import { PortableText } from 'next-sanity';
import { notFound } from 'next/navigation';

const CareerDetailPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: career } = await sanityFetch({
    query: CAREER_QUERY,
    params: await params,
  });

  if (!career) notFound();

  const { name, body, department } = career;

  return (
    <Bounded isPaded className="flex flex-col gap-y-3">
      <BackTo href="/career">Back to All Careers</BackTo>

      <h2 className="font-semibold text-fs-500 text-center">{name}</h2>
      {department && (
        <p>
          <span className="font-semibold">Department: </span>
          {formatTitle(removeDash(department))}
        </p>
      )}

      {body && (
        <div className="prose md:prose-lg min-w-full">
          <PortableText value={body} components={MyPortableText} />
        </div>
      )}
    </Bounded>
  );
};

export default CareerDetailPage;
