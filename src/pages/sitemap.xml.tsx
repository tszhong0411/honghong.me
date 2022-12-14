import { allBlogPosts, allProjects } from 'contentlayer/generated'
import fs from 'fs'
import { GetServerSideProps } from 'next'
import path from 'path'

const createSitemap = (
  slugs: string[]
) => `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>https://honghong.me/</loc>
      </url>
      ${slugs
        .map((slug) => {
          return `
              <url>
                  <loc>https://honghong.me/${slug}</loc>
              </url>
          `
        })
        .join('')}
    </urlset>
`

const root = process.cwd()

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const page = fs
    .readdirSync(path.join(root, 'src', 'app'))
    .filter((slug) => !slug.includes('.mdx') && !slug.includes('.tsx'))

  const projects = allProjects.map((project) => `projects/${project.slug}`)
  const blog = allBlogPosts.map((post) => `blog/${post.slug}`)

  const allPages = [...page, ...projects, ...blog]

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
