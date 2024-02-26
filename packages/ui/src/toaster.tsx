'use client'

import {
  AlertCircleIcon,
  AlertTriangle,
  CheckCircle2Icon,
  InfoIcon
} from 'lucide-react'
import { Toaster as Sonner } from 'sonner'

export type ToasterProps = React.ComponentProps<typeof Sonner>

export const Toaster = (props: ToasterProps) => {
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
          actionButton:
            'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground',
          cancelButton:
            'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground',
          ...toastOptions?.classNames
        },
        ...toastOptions
      }}
      icons={{
        success: <CheckCircle2Icon className='size-5 text-green-500' />,
        error: <AlertCircleIcon className='size-5 text-red-500' />,
        warning: <AlertTriangle className='size-5 text-yellow-500' />,
        info: <InfoIcon className='size-5 text-blue-500' />
      }}
      {...rest}
    />
  )
}

export { toast } from 'sonner'
