import { type MetadataRoute } from 'next'

import { WEBAPP_URL } from '@/lib/constants'

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/404', '/500', '/api/*']
    }
  ],
  sitemap: `${WEBAPP_URL}/sitemap.xml`,
  host: `${WEBAPP_URL}`
})

export default robots
