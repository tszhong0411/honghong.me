import { allBlogPosts } from 'contentlayer/generated'
import { NextResponse } from 'next/server'
import RSS from 'rss'

import { site } from '@/config/site'

export const GET = async () => {
  const feed = new RSS({
    title: "Hong's Blog",
    description: 'A personal website and blog by Hong.',
    site_url: `${site.url}`,
    feed_url: `${site.url}/feed.xml`,
    language: 'en-US',
    image_url: `${site.url}/static/images/og/og.png`,
  })

  const allPosts = allBlogPosts.sort(
    (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
  )

  allPosts.map((post) => {
    const { title, summary, date, slug } = post

    feed.item({
      title: title,
      url: `${site.url}/blog/${slug}`,
      date: date,
      description: summary,
      author: 'Hong',
    })
  })

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml',
    },
  })
}
