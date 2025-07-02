import type { MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/constants'

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: ['/', '/api/avatar/*'],
      disallow: ['/api/']
    }
  ],
  sitemap: `${SITE_URL}/sitemap.xml`
})

export default robots
