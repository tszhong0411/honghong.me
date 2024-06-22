/**
 * Adapted from: https://github.com/delbaoliveira/website/blob/59e6f181ad75751342ceaa8931db4cbcef86b018/ui/BlurImage.tsx
 */
'use client'

import { cn } from '@tszhong0411/utils'
import NextImage from 'next/image'
import { forwardRef, useState } from 'react'

type ImageProps = {
  imageClassName?: string
  lazy?: boolean
} & React.ComponentPropsWithoutRef<typeof NextImage>

export const BlurImage = forwardRef<HTMLImageElement, ImageProps>((props, ref) => {
  const { alt, src, className, imageClassName, lazy = true, ...rest } = props
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className={cn('overflow-hidden', isLoading && 'animate-pulse', className)}>
      <NextImage
        ref={ref}
        className={cn(isLoading && 'scale-[1.02] blur-xl grayscale', imageClassName)}
        style={{
          transition: 'filter 700ms ease, transform 150ms ease'
        }}
        src={src}
        alt={alt}
        loading={lazy ? 'lazy' : undefined}
        priority={!lazy}
        quality={100}
        onLoad={() => {
          setIsLoading(false)
        }}
        {...rest}
      />
    </div>
  )
})

BlurImage.displayName = 'Image'
