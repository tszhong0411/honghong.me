import { type MetadataRoute } from 'next'

import site from '@/config/site'
import {
  type BlogMetadata,
  getAllPages,
  type PageMetadata,
  type ProjectMetadata
} from '@/lib/mdx'

const sitemap = (): MetadataRoute.Sitemap => {
  const blogPosts = getAllPages<BlogMetadata>('blog').map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
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
    url: `${site.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...blogPosts]
}

export default sitemap
