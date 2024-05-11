'use client'

import { useRouter } from 'next/navigation'
import * as React from 'react'

import { isProduction } from '@/lib/constants'

type AutoRefreshProps = {
  children: React.ReactNode
}

export let AutoRefresh = (props: AutoRefreshProps) => {
  const { children } = props

  return children
}

if (!isProduction) {
  AutoRefresh = (props: AutoRefreshProps) => {
    const { children } = props

    const router = useRouter()

    React.useEffect(() => {
      const ws = new WebSocket('ws://localhost:5500')

      ws.addEventListener('message', (event) => {
        if (event.data === 'refresh') {
          router.refresh()
        }
      })

      return () => ws.close()
    }, [router])

    return children
  }
}
