import { MySanityImageProps } from '@/lib/types';
import { urlFor } from '@/sanity/lib/image';
import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';

const MySanityImage = ({ src, className, alt }: MySanityImageProps) => {
  return (
    <Image
      src={urlFor(src).format('webp').auto('format').url()}
      alt={alt}
      width={300}
      height={300}
      className={clsx('object-cover', className)}
    />
  );
};

export default MySanityImage;
