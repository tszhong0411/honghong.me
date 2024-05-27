import { env } from '@tszhong0411/env'
import Script from 'next/script'

import { isProduction } from '@/lib/constants'

const Analytics = () => {
  if (!isProduction) return null

  return (
    <Script
      async
      data-website-id={env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
      src={`${env.NEXT_PUBLIC_UMAMI_URL}/script.js`}
    />
  )
}

export default Analytics
