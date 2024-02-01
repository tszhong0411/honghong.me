import { SessionProvider } from 'next-auth/react'
import React from 'react'

import { TooltipProvider } from '@/components/ui'

type ProvidesProps = {
  children: React.ReactNode
}

const Providers = (props: ProvidesProps) => {
  const { children } = props

  return (
    <SessionProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </SessionProvider>
  )
}

export default Providers
