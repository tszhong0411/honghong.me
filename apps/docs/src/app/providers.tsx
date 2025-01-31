'use client'

import { ThemeProvider } from 'next-themes'

import Sonner from '@/components/sonner'

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
      <Sonner />
    </ThemeProvider>
  )
}

export default Providers
