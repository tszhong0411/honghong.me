'use client'

import { Toaster, TooltipProvider } from '@tszhong0411/ui'
import { ThemeProvider } from 'next-themes'

import { TRPCReactProvider } from '@/trpc/client'

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
        <TooltipProvider>
          {children}
          <Toaster
            toastOptions={{
              duration: 2500
            }}
            visibleToasts={5}
            expand
          />
        </TooltipProvider>
      </ThemeProvider>
    </TRPCReactProvider>
  )
}

export default Providers
