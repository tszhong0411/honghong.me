import Script from 'next/script'
import React from 'react'

import { env } from '@/env'

const Analytics = () => {
  if (process.env.NODE_ENV !== 'production') return null

  return (
    <Script
      async
      data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      src={`${env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
    />
  )
}

export default Analytics
