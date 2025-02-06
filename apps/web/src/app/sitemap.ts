import type { MetadataRoute } from 'next'

import { supportedLanguages } from '@tszhong0411/i18n/config'
import { allPages, allPosts, allProjects } from 'content-collections'

import { SITE_URL } from '@/lib/constants'
import { getLocalizedPath } from '@/utils/get-localized-path'

const sitemap = (): MetadataRoute.Sitemap => {
  const routes = [
    '',
    '/blog',
    '/guestbook',
    '/projects',
    '/dashboard',
    ...new Set(allPages.map((page) => `/${page.slug}`)),
    ...new Set(allProjects.map((project) => `/projects/${project.slug}`)),
    ...new Set(allPosts.map((post) => `/blog/${post.slug}`))
  ]

  return supportedLanguages.flatMap((locale) => {
    return routes.map((route) => ({
      url: `${SITE_URL}${getLocalizedPath({ slug: route, locale: locale.code })}`,
      lastModified: new Date()
    }))
  })
}

export default sitemap
