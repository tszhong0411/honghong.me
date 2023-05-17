'use client'

import { ThemeProvider } from 'next-themes'

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidersProps) => {
  const { children } = props

  return (
    <ThemeProvider
      attribute='class'
      defaultTheme='dark'
      disableTransitionOnChange
    >
      {children}
    </ThemeProvider>
  )
}
export default Providers
