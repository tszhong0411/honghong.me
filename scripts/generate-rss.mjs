import chalk from 'chalk'
import { writeFileSync } from 'fs'
import RSS from 'rss'

import { escape } from './htmlEscaper.mjs'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import i18n from '../i18n.json'
;(async () => {
  console.info(chalk.cyan('info'), ` - Generating RSS feed`)

  const description = {
    'zh-TW': '前端工程師, YouTuber',
    en: 'Front-end developer, YouTuber.',
  }

  i18n.locales.forEach((lang) => {
    const feed = new RSS({
      title: '小康 Blog',
      description: description[lang],
      site_url: 'https://honghong.me',
      feed_url: `https://honghong.me/feed${lang !== i18n.defaultLocale ? `.${lang}` : ''}.xml`,
      image_url: `https://honghong.me/static/images/og/og.png`,
      language: lang,
    })

    const filteredBlogs = allBlogs.filter(
      (post) => post.slug.split('.')[post.slug.split('.').length - 1] === lang
    )

    filteredBlogs.forEach((post) => {
      const { title, date, summary, slug } = post
      const url = `https://honghong.me/blog/${slug.replace(`.${lang}`, '')}`

      feed.item({
        title: escape(title),
        description: summary,
        date: new Date(date).toUTCString(),
        author: '小康',
        url,
        guid: url,
      })
    })

    const rss = feed.xml({ indent: true })
    writeFileSync(`./public/feed${lang !== i18n.defaultLocale ? `.${lang}` : ''}.xml`, rss)
  })
})()
