import { writeFileSync } from 'fs'
import { escape } from './htmlEscaper.mjs'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import i18n from '../i18n.json'
import chalk from 'chalk'
import RSS from 'rss'
;(async () => {
  console.info(chalk.cyan('info'), ` - Generating RSS feed`)

  i18n.locales.forEach((lang) => {
    const feed = new RSS({
      title: '小康 Blog',
      description: siteMetadata.description[lang],
      site_url: siteMetadata.siteUrl,
      feed_url: `${siteMetadata.siteUrl}/feed${lang !== i18n.defaultLocale ? `.${lang}` : ''}.xml`,
      image_url: `${siteMetadata.siteUrl}/static/images/og.png`,
      language: lang,
    })

    const filteredBlogs = allBlogs.filter(
      (post) => post.slug.split('.')[post.slug.split('.').length - 1] === lang
    )

    filteredBlogs.forEach((post) => {
      const { title, date, summary, slug } = post
      const url = `${siteMetadata.siteUrl}/blog/${slug.replace(`.${lang}`, '')}`

      feed.item({
        title: escape(title),
        description: summary,
        date: new Date(date).toUTCString(),
        author: siteMetadata.author,
        url,
        guid: url,
      })
    })

    const rss = feed.xml({ indent: true })
    writeFileSync(`./public/feed${lang !== i18n.defaultLocale ? `.${lang}` : ''}.xml`, rss)
  })
})()
