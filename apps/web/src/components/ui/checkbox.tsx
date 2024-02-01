'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { IconCheck } from '@tabler/icons-react'
import React from 'react'

import cn from '@/utils/cn'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <CheckboxPrimitive.Root
      ref={ref}
      className={cn(
        'peer size-4 shrink-0 rounded-sm border border-border-primary shadow',
        'focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring',
        'data-[state=checked]:bg-foreground data-[state=checked]:text-background',
        'disabled:cursor-not-allowed disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        className={cn('flex items-center justify-center text-current')}
      >
        <IconCheck className='size-4' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
})

Checkbox.displayName = CheckboxPrimitive.Root.displayName

export { Checkbox }
