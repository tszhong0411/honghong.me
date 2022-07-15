import { buildUrl } from 'cloudinary-build-url'
import Image from 'next/image'
import React from 'react'

import { CloudinaryImgType } from './types'

export const CloudinaryImg = ({
  publicId,
  height,
  width,
  alt,
  title,
  aspect,
  className,
  rounded = true,
}: CloudinaryImgType) => {
  const url = buildUrl(publicId, {
    cloud: {
      cloudName: 'tszhong',
    },
    transformations: {
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  })

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
        role='button'
        className={className}
        style={{
          ...(rounded && {
            borderRadius: 12,
          }),
        }}
      />
    </figure>
  )
}
