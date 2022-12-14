import { GetServerSideProps } from 'next'
import RSS from 'rss'

import { getAllPosts } from '@/lib/mdx'

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const feed = new RSS({
    title: '小康 Blog',
    description: "Hong's personal website and blog",
    site_url: 'https://honghong.me',
    feed_url: 'https://honghong.me/feed.xml',
    language: 'en',
    image_url: 'https://honghong.me/static/images/og/og.png',
  })

  const allPosts = getAllPosts()

  allPosts.map((post) => {
    const { title, summary, date, slug } = post

    feed.item({
      title: title,
      url: `https://honghong.me/blog/${slug}`,
      date: date,
      description: summary,
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

const RSSFeed = () => {
  return null
}

export default RSSFeed
