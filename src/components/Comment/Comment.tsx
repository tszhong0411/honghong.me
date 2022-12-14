'use client'

import Giscus from '@giscus/react'
import React from 'react'

import { useTheme } from '@/lib/next-themes'

import { GISCUS_CONFIG } from '@/config/giscus'

const Comment = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className='my-8'>
      <Giscus {...GISCUS_CONFIG} theme={resolvedTheme} />
    </div>
  )
}

export default Comment
