'use client'

import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { cn } from '@tszhong0411/utils'

export const Avatar = (props: React.ComponentProps<typeof AvatarPrimitive.Root>) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Root
      className={cn('relative flex size-10 shrink-0 overflow-hidden rounded-full', className)}
      {...rest}
    />
  )
}

export const AvatarImage = (props: React.ComponentProps<typeof AvatarPrimitive.Image>) => {
  const { className, ...rest } = props

  return <AvatarPrimitive.Image className={cn('aspect-square size-full', className)} {...rest} />
}

export const AvatarFallback = (props: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => {
  const { className, ...rest } = props

  return (
    <AvatarPrimitive.Fallback
      className={cn('bg-muted flex size-full items-center justify-center rounded-full', className)}
      {...rest}
    />
  )
}
