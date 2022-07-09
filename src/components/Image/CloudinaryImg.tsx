import { buildUrl } from 'cloudinary-build-url';
import Image from 'next/image';
import React from 'react';
import Lightbox from 'react-image-lightbox';

import 'react-image-lightbox/style.css';

import { CloudinaryImgType } from './types';

export const CloudinaryImg = ({
  publicId,
  height,
  width,
  alt,
  title,
  preview = true,
  aspect,
  className,
  rounded = true,
}: CloudinaryImgType) => {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const url = buildUrl(publicId, {
    cloud: {
      cloudName: 'tszhong',
    },
    transformations: {
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  });

  return (
    <figure>
      <Image
        width={width}
        height={height}
        src={url}
        alt={alt}
        loading='lazy'
        title={title || alt}
        tabIndex={0}
        onMouseDown={preview ? () => setIsOpen(true) : undefined}
        onKeyDown={preview ? () => setIsOpen(true) : undefined}
        role='button'
        onClick={preview ? () => setIsOpen(true) : undefined}
        className={className}
        style={{
          ...(rounded && {
            borderRadius: 12,
          }),
        }}
      />
      {isOpen && (
        <Lightbox mainSrc={url} onCloseRequest={() => setIsOpen(false)} />
      )}
    </figure>
  );
};
