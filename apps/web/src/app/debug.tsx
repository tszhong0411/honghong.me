'use client'

import { useSearchParams } from 'next/navigation'
import Script from 'next/script'
import { memo } from 'react'

const Debug = memo(() => {
  const searchParams = useSearchParams()

  const debug = searchParams.get('debug')

  if (debug) return <Script src='https://unpkg.com/react-scan/dist/auto.global.js' />

  return null
})

Debug.displayName = 'Debug'

export default Debug
