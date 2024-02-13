import { NextResponse } from 'next/server'
import RSS from 'rss'

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  WEBAPP_URL
} from '@/lib/constants'
import { type BlogMetadata, getAllPages } from '@/lib/mdx'

export const GET = () => {
  const feed = new RSS({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site_url: `${WEBAPP_URL}`,
    feed_url: `${WEBAPP_URL}/rss.xml`,
    language: 'en-US',
    image_url: `${WEBAPP_URL}/images/og.png`
  })

  const posts = getAllPages<BlogMetadata>('blog')

  for (const post of posts) {
    const { title, summary, date, slug } = post

    feed.item({
      title,
      url: `${WEBAPP_URL}/blog/${slug}`,
      date,
      description: summary,
      author: SITE_NAME
    })
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      'Content-Type': 'application/xml'
    }
  })
}
