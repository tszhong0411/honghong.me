import { allBlogPosts, allPages, allProjects } from 'mdx/generated'
import { type MetadataRoute } from 'next'

import { SITE_URL } from '@/lib/constants'

const sitemap = (): MetadataRoute.Sitemap => {
  const blogPosts: MetadataRoute.Sitemap = allBlogPosts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: post.date.split('T')[0]
  }))

  const routes: MetadataRoute.Sitemap = [
    '',
    '/blog',
    '/guestbook',
    '/projects',
    '/dashboard',
    ...allPages.map((page) => `/${page.slug}`),
    ...allProjects.map((project) => `/projects/${project.slug}`)
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...blogPosts]
}

export default sitemap
