'use client'

import { TooltipProvider } from '@tszhong0411/ui'
import { SessionProvider } from 'next-auth/react'
import React from 'react'
import { Toaster } from 'sonner'

type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props

  return (
    <SessionProvider>
      <TooltipProvider>
        {children}
        <Toaster
          toastOptions={{
            classNames: {
              success: '[&>[data-icon]]:text-green-500',
              error: '[&>[data-icon]]:text-red-500',
              info: '[&>[data-icon]]:text-blue-500',
              warning: '[&>[data-icon]]:text-yellow-500'
            },
            duration: 2500
          }}
          visibleToasts={5}
          theme='dark'
          expand
        />
      </TooltipProvider>
    </SessionProvider>
  )
}

export default Providers
