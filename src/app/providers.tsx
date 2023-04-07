'use client'

import { ThemeProvider } from 'next-themes'
import React from 'react'

import { WithChildren } from '@/types'

type ProvidersProps = WithChildren

const Providers = (props: ProvidersProps) => {
  const { children } = props

  return (
    <ThemeProvider attribute='class' defaultTheme='dark'>
      {children}
    </ThemeProvider>
  )
}

export default Providers
