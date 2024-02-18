import { type MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/constants'
import {
  type BlogMetadata,
  getAllPages,
  type PageMetadata,
  type ProjectMetadata
} from '@/lib/mdx'

const sitemap = (): MetadataRoute.Sitemap => {
  const blogPosts = getAllPages<BlogMetadata>('blog').map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date.split('T')[0]
  }))

  const routes = [
    '',
    '/blog',
    '/guestbook',
    '/projects',
    '/dashboard',
    ...getAllPages<PageMetadata>('pages').map((page) => `/${page.slug}`),
    ...getAllPages<ProjectMetadata>('projects').map(
      (project) => `/projects/${project.slug}`
    )
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...blogPosts]
}

export default sitemap
