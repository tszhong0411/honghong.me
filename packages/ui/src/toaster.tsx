import { AlertCircleIcon, AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = (props: ToasterProps) => {
  const { theme = 'system', ...rest } = props

  return (
    <Sonner
      theme={theme}
      style={
        {
          '--normal-border': 'var(--color-border)',
          '--normal-bg': 'var(--color-background)',
          '--normal-text': 'var(--color-foreground)'
        } as React.CSSProperties
      }
      icons={{
        success: <CheckCircle2Icon className='size-5 text-green-500' />,
        error: <AlertCircleIcon className='size-5 text-red-500' />,
        warning: <AlertTriangleIcon className='size-5 text-yellow-500' />,
        info: <InfoIcon className='size-5 text-blue-500' />
      }}
      {...rest}
    />
  )
}

export { Toaster, type ToasterProps }
export { toast } from 'sonner'
