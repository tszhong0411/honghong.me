import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import cn from '@/utils/cn'

const buttonVariants = cva(
  [
    'inline-flex items-center justify-center rounded-md border text-sm font-medium ring-offset-background transition-colors duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50',
    'hover:border-border-highlight'
  ],
  {
    variants: {
      variant: {
        default:
          'bg-zinc-800 text-zinc-300 hover:bg-zinc-800/90 hover:text-foreground',
        destructive: 'border-none bg-red-600 text-white hover:bg-red-600/90',
        outline:
          'bg-background text-zinc-300 hover:bg-zinc-800/90 hover:text-foreground',
        ghost: 'border-transparent hover:bg-accent hover:text-white'
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-10'
      }
    },
    defaultVariants: {
      variant: 'default',
      size: 'default'
    }
  }
)

export type ButtonProps = {
  asChild?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    const { className, variant, size, asChild = false, ...rest } = props

    const Component = asChild ? Slot : 'button'

    return (
      <Component
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...rest}
      />
    )
  }
)

Button.displayName = 'Button'

export { Button, buttonVariants }
