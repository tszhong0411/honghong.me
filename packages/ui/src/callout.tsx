import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertOctagonIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react'
import * as React from 'react'

export const calloutVariants = cva(
  'my-6 flex flex-row gap-2 rounded-lg border bg-card p-3 text-sm text-muted-foreground shadow-md',
  {
    variants: {
      variant: {
        error: 'border-red-200/30 bg-red-900/30 text-red-200',
        info: 'border-blue-200/30 bg-blue-900/30 text-blue-200',
        warning: 'border-yellow-200/30 bg-yellow-700/30 text-yellow-200'
      }
    },
    defaultVariants: {
      variant: 'info'
    }
  }
)

type CalloutProps = { title?: string } & React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof calloutVariants>

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  (props, ref) => {
    const { variant, className, title, children, ...rest } = props

    const icons = {
      info: <InfoIcon className='size-5 fill-blue-500 text-card' />,
      warning: (
        <AlertTriangleIcon className='size-5 fill-orange-500 text-card' />
      ),
      error: <AlertOctagonIcon className='size-5 fill-red-500 text-card' />
    }

    return (
      <div
        ref={ref}
        className={cn(calloutVariants({ variant, className }))}
        {...rest}
      >
        {variant ? icons[variant] : icons['info']}
        <div className='w-0 flex-1'>
          {title ? (
            <div className='mb-2 font-medium text-card-foreground'>{title}</div>
          ) : null}
          <div className='prose-no-margin'>{children}</div>
        </div>
      </div>
    )
  }
)

Callout.displayName = 'Callout'
