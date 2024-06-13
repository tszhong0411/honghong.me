'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'

export const Avatar = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Root
      ref={ref}
      className={cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', className)}
      {...rest}
    />
  )
})

export const AvatarImage = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Image>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Image
      ref={ref}
      className={cn('aspect-square size-full', className)}
      {...rest}
    />
  )
})

export const AvatarFallback = forwardRef<
  React.ElementRef<typeof AvatarPrimitive.Fallback>,
  React.ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Fallback
      ref={ref}
      className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)}
      {...rest}
    />
  )
})

Avatar.displayName = AvatarPrimitive.Root.displayName
AvatarImage.displayName = AvatarPrimitive.Image.displayName
AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName
