'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

type ProvidersProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidersProps) => {
  const { children } = props

  return (
    <ThemeProvider attribute='class' disableTransitionOnChange>
      {children}
    </ThemeProvider>
  )
}

export default Providers
