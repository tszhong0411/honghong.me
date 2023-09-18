import { type MetadataRoute } from 'next'

import site from '@/config/site'

const robots = (): MetadataRoute.Robots => ({
  rules: [
    {
      userAgent: '*',
      allow: ['/'],
      disallow: ['/404', '/500', '/api/*']
    }
  ],
  sitemap: `${site.url}/sitemap.xml`,
  host: `${site.url}`
})

export default robots
