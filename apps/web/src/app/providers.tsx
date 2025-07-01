'use client'

import { QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { Toaster, TooltipProvider } from '@tszhong0411/ui'
import { ThemeProvider } from 'next-themes'

import { queryClient } from '@/orpc/query-client'

type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props

  return (
    <QueryClientProvider client={queryClient}>
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
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default Providers
