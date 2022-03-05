import { writeFileSync } from 'fs'
import chalk from 'chalk'
import globby from 'globby'
import prettier from 'prettier'
import { allBlogs } from '../.contentlayer/generated/index.mjs'
import i18n from '../i18n.json'
;(async () => {
  console.info(chalk.cyan('info'), ` - Generating sitemap`)
  const prettierConfig = await prettier.resolveConfig('./.prettierrc')
  const contentPages = allBlogs
    .filter((p) => p.slug.split('.')[p.slug.split('.').length - 1] === i18n.defaultLocale)
    .map((x) => `/${x._raw.flattenedPath}`)
    .filter((x) => !x.draft && !x.canonicalUrl)

  const pages = await globby([
    'pages/*.{js|tsx}',
    '!pages/_*.{js|tsx}',
    '!pages/api',
    '!pages/404.{js|tsx}',
  ])
  const sitemap = `
        <?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
            ${pages
              .concat(contentPages)
              .map((page) => {
                const path = page
                  .replace('pages/', '/')
                  .replace('public/', '/')
                  .replace('.js', '')
                  .replace('.mdx', '')
                  .replace('.md', '')
                  .replace('/feed.xml', '')
                  .replace(`.${i18n.defaultLocale}`, '')

                const route = path === '/index' ? '' : path
                return `
                        <url>
                            <loc>https://honghong.me${route}</loc>
                            <changefreq>daily</changefreq>
                            <priority>0.7</priority>
                        </url>
                    `
              })
              .join('')}
        </urlset>
    `

  const formatted = prettier.format(sitemap, {
    ...prettierConfig,
    parser: 'html',
  })

  writeFileSync('public/sitemap.xml', formatted)
})()
