'use client'

import { AlertCircleIcon, AlertTriangleIcon, CheckCircle2Icon, InfoIcon } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = (props: ToasterProps) => {
  const { theme = 'system' } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      className='toaster group'
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)'
        } as React.CSSProperties
      }
      icons={{
        success: <CheckCircle2Icon className='size-5 text-green-500' />,
        error: <AlertCircleIcon className='size-5 text-red-500' />,
        warning: <AlertTriangleIcon className='size-5 text-yellow-500' />,
        info: <InfoIcon className='size-5 text-blue-500' />
      }}
      {...props}
    />
  )
}

export { Toaster }
