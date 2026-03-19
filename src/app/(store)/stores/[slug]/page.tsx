import ReactMapBox from '@/components/features/MapBox';
import BackTo from '@/components/shared/BackTo';
import Bounded from '@/components/shared/Bounded';
import PageTitle from '@/components/shared/PageTitle';
import { urlFor } from '@/sanity/lib/image';
import { sanityFetch } from '@/sanity/lib/live';
import { STORE_QUERY } from '@/sanity/lib/queries';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';

const StoreDetail = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { data: store } = await sanityFetch({
    query: STORE_QUERY,
    params: await params,
  });

  if (!store) notFound();

  return (
    <Bounded isPaded>
      <PageTitle
        title={store.name as string}
        text={`${store.city}, ${store.country}`}
      />

      <BackTo href="/stores">Back to All Store</BackTo>

      <div className="grid md:grid-cols-2 gap-5">
        <div>
          {store.imageAlt && store.imageUrl ? (
            <Image
              src={urlFor(store.imageUrl).format('webp').url()}
              width={1200}
              height={800}
              loading="lazy"
              alt={store.imageAlt || ''}
              className="w-full object-cover"
            />
          ) : null}
        </div>

        <div className="grid grid-cols-2 gap-y-3">
          <p className="font-semibold">Address 1:</p>
          <p>{store.address1}</p>

          <p className="font-semibold">Address 2:</p>
          <p>{store.address2 ?? 'N/A'}</p>

          <p className="font-semibold">City:</p>
          <p>{store.city}</p>

          <p className="font-semibold">State: </p>
          <p>{store.state}</p>

          <p className="font-semibold">Zip: </p>
          <p>{store.zip}</p>

          <p className="font-semibold">Country: </p>
          <p>{store.country}</p>
        </div>
      </div>

      <ReactMapBox lat={Number(store.lat)} long={Number(store.long)} />
    </Bounded>
  );
};

export default StoreDetail;
