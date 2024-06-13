import { cn } from '@tszhong0411/utils'
import { cva, type VariantProps } from 'class-variance-authority'
import { AlertOctagonIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react'
import { forwardRef } from 'react'

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

export const Callout = forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { variant, className, title, children, ...rest } = props

  const icons = {
    info: <InfoIcon className='text-card size-5 fill-blue-500' />,
    warning: <AlertTriangleIcon className='text-card size-5 fill-orange-500' />,
    error: <AlertOctagonIcon className='text-card size-5 fill-red-500' />
  }

  return (
    <div ref={ref} className={cn(calloutVariants({ variant, className }))} {...rest}>
      {variant ? icons[variant] : icons.info}
      <div className='w-0 flex-1'>
        {title ? <div className='text-card-foreground mb-2 font-medium'>{title}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  )
})

Callout.displayName = 'Callout'
