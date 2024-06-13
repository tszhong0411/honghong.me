'use client'

import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'

export const Separator = forwardRef<
  React.ElementRef<typeof SeparatorPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>((props, ref) => {
  const { className, orientation = 'horizontal', decorative = true, ...rest } = props

  return (
    <SeparatorPrimitive.Root
      ref={ref}
      decorative={decorative}
      orientation={orientation}
      className={cn(
        'bg-border shrink-0',
        orientation === 'horizontal' ? 'h-px w-full' : 'h-full w-px',
        className
      )}
      {...rest}
    />
  )
})

Separator.displayName = SeparatorPrimitive.Root.displayName
