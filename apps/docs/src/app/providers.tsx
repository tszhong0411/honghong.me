'use client'

import { Toaster } from '@tszhong0411/ui'
import { ThemeProvider } from 'next-themes'

type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='system'
      enableSystem
      enableColorScheme
      disableTransitionOnChange
    >
      {children}
      <Toaster
        toastOptions={{
          duration: 2500
        }}
        visibleToasts={5}
        expand
      />
    </ThemeProvider>
  )
}

export default Providers
