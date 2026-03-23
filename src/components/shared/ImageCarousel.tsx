'use client';

import { useEffect, useState } from 'react';
import MySanityImage from './MySanityImage';
import Image from 'next/image';

interface productImages {
  imageAlt: string | null;
  imageUrl: string | null;
}

const ImageCarousel = ({ images }: { images: productImages[] }) => {
  const [preview, setPreview] = useState<string | null>(
    (images[0].imageUrl as string) || null,
  );

  useEffect(() => setPreview(images[0].imageUrl), [images[0].imageUrl]);

  return (
    <div className="flex flex-col gap-y-3">
      <MySanityImage src={preview as string} alt={''} className="w-full" />

      <div className="flex gap-x-1">
        {images?.map((img) => (
          <Image
            key={img.imageUrl}
            src={img.imageUrl as string}
            alt={img.imageAlt || ''}
            width={100}
            height={100}
            loading="lazy"
            onClick={() => setPreview(img.imageUrl)}
            className="cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
