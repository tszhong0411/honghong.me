'use client'

import { TooltipProvider } from '@tszhong0411/ui'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Suspense } from 'react'

import Sonner from '@/components/sonner'
import { TRPCReactProvider } from '@/trpc/react'

import Debug from './debug'

type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props

  return (
    <TRPCReactProvider>
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        enableColorScheme
        disableTransitionOnChange
      >
        <SessionProvider>
          <TooltipProvider>
            {children}
            <Sonner />
            <Suspense>
              <Debug />
            </Suspense>
          </TooltipProvider>
        </SessionProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  )
}

export default Providers
