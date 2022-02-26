import { writeFileSync } from 'fs'
import { escape } from './htmlEscaper.mjs'
import siteMetadata from '../data/siteMetadata.js'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import i18n from '../i18n.json'

const generateRssItem = (post, lang) => {
  return `
  <item>
    <guid>${siteMetadata.siteUrl}/blog/${post.slug.replace(`.${lang}`, '')}</guid>
    <title>${escape(post.title)}</title>
    <link>${siteMetadata.siteUrl}/blog/${post.slug.replace(`.${lang}`, '')}</link>
    ${post.summary && `<description>${escape(post.summary)}</description>`}
    <pubDate>${new Date(post.date).toUTCString()}</pubDate>
    <author>${siteMetadata.email} (${siteMetadata.author})</author>
  </item>
`
}

const generateRss = (posts, page = 'feed.xml', lang) => {
  return `
  <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
    <channel>
      <title>${escape(siteMetadata.title)}</title>
      <link>${siteMetadata.siteUrl}/blog</link>
      <description>${escape(siteMetadata.description[lang])}</description>
      <language>${lang}</language>
      <managingEditor>${siteMetadata.email} (${siteMetadata.author})</managingEditor>
      <webMaster>${siteMetadata.email} (${siteMetadata.author})</webMaster>
      <lastBuildDate>${new Date(posts[0].date).toUTCString()}</lastBuildDate>
      <atom:link href="${siteMetadata.siteUrl}/${page}" rel="self" type="application/rss+xml"/>
      ${posts.map((p) => generateRssItem(p, lang)).join('')}
    </channel>
  </rss>
`
}

async function generate() {
  // RSS for blog post
  if (allBlogs.length > 0) {
    // for each lang
    i18n.locales.forEach((lang) => {
      var rss = generateRss(
        allBlogs.filter((post) => post.slug.split('.')[post.slug.split('.').length - 1] === lang),
        `feed${lang !== i18n.defaultLocale ? `.${lang}` : ''}.xml`,
        lang
      )
      writeFileSync(`./public/feed${lang !== i18n.defaultLocale ? `.${lang}` : ''}.xml`, rss)
    })
  }
}

generate()
