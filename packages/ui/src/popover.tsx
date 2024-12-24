'use client'

import * as PopoverPrimitive from '@radix-ui/react-popover'
import { cn } from '@tszhong0411/utils'

export const Popover = PopoverPrimitive.Root
export const PopoverTrigger = PopoverPrimitive.Trigger

export const PopoverContent = (props: React.ComponentProps<typeof PopoverPrimitive.Content>) => {
  const { className, align = 'center', sideOffset = 4, ...rest } = props

  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        align={align}
        sideOffset={sideOffset}
        className={cn(
          'bg-popover text-popover-foreground z-50 w-72 rounded-md border p-4 shadow-md outline-none',
          'data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          'data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95',
          'data-[side=top]:slide-in-from-bottom-2',
          'data-[side=right]:slide-in-from-left-2',
          'data-[side=bottom]:slide-in-from-top-2',
          'data-[side=left]:slide-in-from-right-2',
          className
        )}
        {...rest}
      />
    </PopoverPrimitive.Portal>
  )
}

PopoverContent.displayName = PopoverPrimitive.Content.displayName
