import { site } from '@/config/site'

const robots = () => {
  return {
    rules: [
      {
        userAgent: '*',
        allow: ['/'],
        disallow: ['/404', '/500', '/api/*'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: `${site.url}`,
  }
}

export default robots
