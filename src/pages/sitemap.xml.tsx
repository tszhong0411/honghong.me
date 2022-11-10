import { GetServerSideProps } from 'next'

import { formatSlug, getFileSlugs } from '@/lib/mdx'

const createSitemap = (
  slugs: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${slugs
          .map((slug) => {
            return `
                <url>
                    <loc>${`https://honghong.me/${formatSlug(slug)}`}</loc>
                </url>
            `
          })
          .join('')}
    </urlset>
`

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const slugs = getFileSlugs('blog', 'zh-TW')
  const allPages = [
    ...slugs.map((slug) => `blog/${slug}`),
    ...[
      'about',
      'blog',
      'dashboard',
      'guestbook',
      'pc-specs',
      'projects',
      'uses',
    ],
  ]

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    'public, s-maxage=1200, stale-while-revalidate=600'
  )
  res.write(createSitemap(allPages))
  res.end()

  return {
    props: {},
  }
}

const Sitemap = () => {
  return null
}

export default Sitemap
