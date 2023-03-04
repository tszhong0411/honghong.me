/* eslint-disable no-console */
import chalk from 'chalk'
import fs from 'node:fs'
import RSS from 'rss'

import { allBlogPosts } from '../../.contentlayer/generated/index.mjs'

const path = './public/feed.xml'

const feed = new RSS({
  title: '小康 Blog',
  description: '小康的個人網站和部落格',
  site_url: 'https://honghong.me',
  feed_url: 'https://honghong.me/feed.xml',
  language: 'en',
  image_url: 'https://honghong.me/static/images/og/og.png',
})

const allPosts = allBlogPosts.sort(
  (a, b) => Number(new Date(b.date)) - Number(new Date(a.date))
)

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

fs.writeFileSync(path, feed.xml({ indent: true }))
console.log(chalk.green(`✅ RSS 已產生: ${path}`))
