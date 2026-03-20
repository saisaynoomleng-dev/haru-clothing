import { urlFor } from '@/sanity/lib/image';
import { PortableTextComponents } from 'next-sanity';
import Image from 'next/image';
import Link from 'next/link';

export const MyPortableText: PortableTextComponents = {
  types: {
    image: ({ value }) =>
      value ? (
        <Image
          src={urlFor(value).format('webp').url()}
          alt={value.alt || ''}
          width={600}
          height={400}
          loading="lazy"
          className="mx-auto w-50"
        />
      ) : null,
  },
  list: {
    bullet: ({ children }) => (
      <ul className="marker:text-brand-pink-200">{children}</ul>
    ),
  },
  marks: {
    link: ({ value, children }) => (
      <Link href={value?.href} className="underline text-brand-pink-200">
        {children}
      </Link>
    ),
  },
};
