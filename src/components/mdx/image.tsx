'use client'

import { cx } from '@tszhong0411/utils'
import NextImage from 'next/image'
import React from 'react'

export type ImageProps = {
  imageClassName?: string
} & React.ComponentPropsWithoutRef<typeof NextImage>

const Image = (props: ImageProps) => {
  const { alt, src, className, imageClassName, ...rest } = props
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div
      className={cx('overflow-hidden', isLoading && 'animate-pulse', className)}
    >
      <NextImage
        className={cx(
          'my-0 transition-[scale,filter] duration-700',
          isLoading && 'scale-[1.02] blur-xl grayscale',
          imageClassName,
        )}
        src={src}
        alt={alt}
        loading='lazy'
        quality={100}
        onLoadingComplete={() => setLoading(false)}
        {...rest}
      />
    </div>
  )
}
export default Image
