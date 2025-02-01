import { cn } from '@tszhong0411/utils'
import { AlertOctagonIcon, AlertTriangleIcon, InfoIcon } from 'lucide-react'

type CalloutProps = {
  title?: React.ReactNode
  type?: 'info' | 'warning' | 'error'
  icon?: React.ReactNode
} & React.ComponentProps<'div'>

const Callout = (props: CalloutProps) => {
  const { title, type = 'info', icon, className, children, ...rest } = props

  const icons = {
    info: <InfoIcon className='my-0.5 size-4 text-blue-500' />,
    warning: <AlertTriangleIcon className='my-0.5 size-4 text-orange-500' />,
    error: <AlertOctagonIcon className='my-0.5 size-4 text-red-500' />
  }

  return (
    <div
      role='alert'
      className={cn(
        'bg-card text-muted-foreground shadow-xs my-6 flex w-full flex-row gap-2 rounded-lg border p-3 text-sm',
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
}

export { Callout }
