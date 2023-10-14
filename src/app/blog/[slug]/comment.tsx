'use client'

import Giscus from '@giscus/react'
import { useTheme } from 'next-themes'
import React from 'react'

import GISCUS_CONFIG from '@/config/giscus'

const Comment = () => {
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <div className='my-8'>
      <Giscus theme={resolvedTheme} {...GISCUS_CONFIG} />
    </div>
  )
}
export default Comment
