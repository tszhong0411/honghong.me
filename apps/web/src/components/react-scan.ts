'use client'

// eslint-disable-next-line simple-import-sort/imports -- react-scan must be imported before react
import { scan } from 'react-scan'

import { env } from '@tszhong0411/env'
import { useEffect } from 'react'

const ReactScan = () => {
  useEffect(() => {
    scan({
      enabled: env.NODE_ENV === 'development'
    })
  }, [])

  return null
}

export default ReactScan
