'use client'

import { Toaster, type ToasterProps } from '@tszhong0411/ui'
import { useTheme } from 'next-themes'

const Sonner = () => {
  const { theme } = useTheme()

  return (
    <Toaster
      toastOptions={{
        duration: 2500
      }}
      visibleToasts={5}
      theme={theme as ToasterProps['theme']}
      expand
    />
  )
}

export default Sonner
