import Image from 'next/image'
import React from 'react'

import { CloudinaryImgType } from './types'

export const CloudinaryImg = ({
  publicId,
  height,
  width,
  alt,
  title,
  className,
  rounded = true,
}: CloudinaryImgType) => {
  return (
    <figure>
      <Image
        width={width}
        height={height}
        src={publicId}
        alt={alt}
        loading='lazy'
        title={title || alt}
        placeholder='blur'
        blurDataURL={`https://res.cloudinary.com/tszhong/image/upload/q_1,f_auto,e_blur:1000/${publicId}`}
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
