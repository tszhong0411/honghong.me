'use client'

import { AlertCircleIcon, AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = (props: ToasterProps) => {
  const { theme = 'system', toastOptions, ...rest } = props

  return (
    <Sonner
      theme={theme}
      className='toaster group'
      toastOptions={{
        classNames: {
          toast:
            'group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg',
          description: 'group-[.toast]:text-muted-foreground',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          ...toastOptions?.classNames
        },
        ...toastOptions
      }}
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
