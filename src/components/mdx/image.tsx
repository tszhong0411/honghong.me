'use client'

import NextImage from 'next/image'
import React from 'react'

import cn from '@/utils/cn'

export type ImageProps = {
  imageClassName?: string
  lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof NextImage>

const Image = React.forwardRef<HTMLDivElement, ImageProps>((props, ref) => {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props
  const [isLoading, setLoading] = React.useState(true)

  return (
    <div
      className={cn('overflow-hidden', isLoading && 'animate-pulse', className)}
      data-testid='image-container'
      ref={ref}
    >
      <NextImage
        className={cn(
          'transition-[scale,filter] duration-700',
          isLoading && 'scale-[1.02] blur-xl grayscale',
          imageClassName
        )}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        priority={!lazy}
        quality={100}
        onLoad={() => setLoading(false)}
        {...rest}
      />
    </div>
  )
})

Image.displayName = 'Image'

export default Image
