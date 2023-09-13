import Script from 'next/script'
import React from 'react'

import { env } from '@/env.mjs'

const Analytics = () => {
  return (
    <>
      {process.env.NODE_ENV === 'production' && (
        <Script
          async
          data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
          src={`${env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
        />
      )}
    </>
  )
}

export default Analytics
