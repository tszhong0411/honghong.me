import { cva, type VariantProps } from 'class-variance-authority'
import React from 'react'

import cn from '@/utils/cn'

export const alertVariants = cva(
  'flex w-full justify-start gap-4 rounded-lg border p-4',
  {
    variants: {
      variant: {
        default: '',
        danger: 'border-red-200/30 bg-red-900/30 text-red-200',
        info: 'border-blue-200/30 bg-blue-900/30 text-blue-200',
        warning: 'border-yellow-200/30 bg-yellow-700/30 text-yellow-200'
      }
    },
    defaultVariants: {
      variant: 'default'
    }
  }
)

type AlertProps = {
  icon?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>

const Alert = React.forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  const { variant, className, icon, children, ...rest } = props

  return (
    <div
      ref={ref}
      className={cn(alertVariants({ variant, className }))}
      {...rest}
    >
      <div className='flex size-5 items-center justify-center'>{icon}</div>
      <div className='flex-1 space-y-1.5'>{children}</div>
    </div>
  )
})

const AlertTitle = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...rest } = props

  return (
    <div
      ref={ref}
      className={cn('flex h-5 items-center font-semibold', className)}
      {...rest}
    />
  )
})

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>((props, ref) => {
  const { className, ...rest } = props

  return <div ref={ref} className={cn('text-sm', className)} {...rest} />
})

Alert.displayName = 'Alert'
AlertTitle.displayName = 'AlertTitle'
AlertDescription.displayName = 'AlertDescription'

export { Alert, AlertDescription, AlertTitle }
