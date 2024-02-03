import { TooltipProvider } from '@tszhong0411/ui'
import { SessionProvider } from 'next-auth/react'
import React from 'react'

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
