'use client'

import { Toaster, type ToasterProps } from '@tszhong0411/ui'
import { ThemeProvider, useTheme } from 'next-themes'

type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props
  const { theme } = useTheme()

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
        theme={theme as ToasterProps['theme']}
        expand
      />
    </ThemeProvider>
  )
}

export default Providers
