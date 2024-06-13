'use client'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { cn } from '@tszhong0411/utils'
import { forwardRef } from 'react'

export const ScrollArea = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
>((props, ref) => {
  const { className, children, ...rest } = props

  return (
    <ScrollAreaPrimitive.Root
      ref={ref}
      className={cn('relative overflow-hidden', className)}
      {...rest}
    >
      <ScrollAreaPrimitive.Viewport className='size-full rounded-[inherit]'>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
})

export const ScrollBar = forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>((props, ref) => {
  const { className, orientation = 'vertical', ...rest } = props

  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      ref={ref}
      orientation={orientation}
      className={cn(
        'flex touch-none select-none transition-colors',
        orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-px',
        orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-px',
        className
      )}
      {...rest}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb className='bg-border relative flex-1 rounded-full' />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
})

ScrollArea.displayName = ScrollAreaPrimitive.ScrollArea.displayName
ScrollBar.displayName = ScrollAreaPrimitive.Scrollbar.displayName
