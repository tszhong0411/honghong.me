'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

/**
 * The props of {@link Providers}.
 */
type ProvidersProps = {
  /**
   * The child elements to render.
   */
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
