import { i18n } from '@tszhong0411/i18n/config'
import { getTranslations } from '@tszhong0411/i18n/server'
import { allPosts } from 'content-collections'
import { NextResponse } from 'next/server'
import RSS from 'rss'

import { SITE_NAME, SITE_URL } from '@/lib/constants'

export const GET = async () => {
  const t = await getTranslations({ locale: i18n.defaultLocale })

  const feed = new RSS({
    title: t('metadata.site-title'),
    description: t('metadata.site-description'),
    site_url: SITE_URL,
    feed_url: `${SITE_URL}/rss.xml`,
    language: 'en-US',
    image_url: `${SITE_URL}/images/og.png`
  })

  const posts = allPosts.filter((p) => p.locale === i18n.defaultLocale)

  for (const post of posts) {
    const { title, summary, date, slug } = post

    feed.item({
      title,
      url: `${SITE_URL}/blog/${slug}`,
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
