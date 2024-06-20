import { cn } from '@tszhong0411/utils'
import { AlertOctagonIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react'
import { forwardRef } from 'react'

type CalloutProps = {
  title?: React.ReactNode
  type?: 'info' | 'warning' | 'error'
  icon?: React.ReactNode
} & React.HTMLAttributes<HTMLDivElement>

export const Callout = forwardRef<HTMLDivElement, CalloutProps>((props, ref) => {
  const { title, type = 'info', icon, className, children, ...rest } = props

  const icons = {
    info: <InfoIcon className='text-card size-5 fill-blue-500' />,
    warning: <AlertTriangleIcon className='text-card size-5 fill-orange-500' />,
    error: <AlertOctagonIcon className='text-card size-5 fill-red-500' />
  }

  return (
    <div
      ref={ref}
      className={cn(
        'bg-card text-muted-foreground my-6 flex w-full flex-row gap-2 rounded-lg border p-3 text-sm shadow-md',
        className
      )}
      {...rest}
    >
      {icon ?? icons[type]}
      <div className='w-0 flex-1'>
        {title ? <div className='text-card-foreground mb-2 font-medium'>{title}</div> : null}
        <div>{children}</div>
      </div>
    </div>
  )
})

Callout.displayName = 'Callout'
