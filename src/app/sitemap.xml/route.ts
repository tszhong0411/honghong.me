import { allBlogPosts, allPages, allProjects } from 'contentlayer/generated'
import { NextResponse } from 'next/server'

import { site } from '@/config/site'

export const GET = async () => {
  const getEntry = (route = '') => {
    return `
        <url>
            <loc>${site.url}/${route}</loc>
            <changefreq>daily</changefreq>
            <priority>0.7</priority>
        </url>
        `
  }

  const routes = [
    '',
    'blog',
    'guestbook',
    'projects',
    'dashboard',
    ...allBlogPosts.map((post) => `blog/${post.slug}`),
    ...allProjects.map((project) => `projects/${project.slug}`),
    ...allPages.map((page) => page.slug),
  ]

  let content = `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1" xmlns:video="http://www.google.com/schemas/sitemap-video/1.1">`

  routes.forEach((route) => {
    content += getEntry(route)
  })
  content += `</urlset>`

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
