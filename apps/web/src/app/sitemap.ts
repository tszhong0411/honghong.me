import type { MetadataRoute } from 'next'

import { supportedLanguages } from '@tszhong0411/i18n/config'
import { allPages, allPosts, allProjects } from 'content-collections'

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
      url: getLocalizedPath({ slug: route, locale: locale.code, absolute: true }),
      lastModified: new Date()
    }))
  })
}

export default sitemap
