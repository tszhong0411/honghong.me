import { GetServerSideProps } from 'next'
import RSS from 'rss'

import { getAllPosts } from '@/lib/mdx'

import { PostFrontMatter } from './blog'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: '小康 Blog',
    description: '小康的個人網站和部落格',
    site_url: 'https://honghong.me',
    feed_url: 'https://honghong.me/feed.xml',
    language: 'zh-TW',
    image_url: 'https://honghong.me/static/images/og/og.png',
  })

  const allPosts = getAllPosts('zh-TW')

  allPosts.map((post: PostFrontMatter) => {
    feed.item({
      title: post.title,
      url: `https://honghong.me/blog/${post.slug}`,
      date: post.date,
      description: post.summary,
      author: '小康',
    })
  })

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  )
  res.write(feed.xml({ indent: true }))
  res.end()

  return {
    props: {},
  }
}

export default function RSSFeed() {
  return null
}
