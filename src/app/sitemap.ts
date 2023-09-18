import { allBlogPosts, allPages, allProjects } from 'contentlayer/generated'
import { type MetadataRoute } from 'next'

import site from '@/config/site'

const sitemap = (): MetadataRoute.Sitemap => {
  const blogs = allBlogPosts.map((post) => ({
    url: `${site.url}/blog/${post.slug}`,
    lastModified: post.date.split('T')[0]
  }))

  const routes = [
    '',
    '/blog',
    '/guestbook',
    '/projects',
    '/dashboard',
    ...allPages.map((page) => `/${page.slug}`),
    ...allProjects.map((project) => `/projects/${project.slug}`)
  ].map((route) => ({
    url: `${site.url}${route}`,
    lastModified: new Date().toISOString().split('T')[0]
  }))

  return [...routes, ...blogs]
}

export default sitemap
