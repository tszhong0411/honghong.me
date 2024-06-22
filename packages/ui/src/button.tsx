'use client'

import { Slot } from '@radix-ui/react-slot'
import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { forwardRef } from 'react'

export const buttonVariants = cva(
  [
    'ring-offset-background inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors',
    'focus-visible:ring-ring focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2',
    'disabled:pointer-events-none disabled:opacity-50'
  ],
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border-input bg-background hover:bg-accent hover:text-accent-foreground border',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline'
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

export const Button = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'type'> & {
    type: React.ButtonHTMLAttributes<HTMLButtonElement>['type']
  }
>((props, ref) => {
  const { className, variant, size, asChild = false, ...rest } = props

  const Component = asChild ? Slot : 'button'

  return (
    <Component ref={ref} className={cn(buttonVariants({ variant, size, className }))} {...rest} />
  )
})

Button.displayName = 'Button'
