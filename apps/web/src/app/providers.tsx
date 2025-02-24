'use client'

import { Toaster, TooltipProvider } from '@tszhong0411/ui'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'
import { Suspense } from 'react'

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
            <Toaster
              toastOptions={{
                duration: 2500
              }}
              visibleToasts={5}
              expand
            />
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
