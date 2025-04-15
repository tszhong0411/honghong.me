'use client'

import * as CheckboxPrimitive from '@radix-ui/react-checkbox'
import { CheckIcon } from 'lucide-react'

import { cn } from '@/utils/cn'

type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>

const Checkbox = (props: CheckboxProps) => {
  const { className, ...rest } = props

  return (
    <CheckboxPrimitive.Root
      data-slot='checkbox'
      className={cn(
        'border-input dark:bg-input/30 shadow-xs peer size-4 shrink-0 rounded-[4px] border outline-none transition-shadow',
        'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
        'disabled:cursor-not-allowed disabled:opacity-50',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        'data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary',
        className
      )}
      {...rest}
    >
      <CheckboxPrimitive.Indicator
        data-slot='checkbox-indicator'
        className='flex items-center justify-center text-current transition-none'
      >
        <CheckIcon className='size-3.5' />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  )
}

export { Checkbox }
