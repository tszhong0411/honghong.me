/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'

import { formatSlug, getContentBySlug, getFileSlugs } from '@/lib/mdx'

import MDXComponents from '@/components/MDXComponents'
import Typography from '@/components/Typography'

import BlogLayout, { BlogPostProps } from '@/layouts/blog'

const Blog = ({ post }: BlogPostProps) => {
  return (
    <BlogLayout post={post}>
      <Typography>
        <MDXRemote
          {...post.source}
          components={
            {
              ...MDXComponents,
            } as any
          }
        />
      </Typography>
    </BlogLayout>
  )
}

export const getStaticProps: GetStaticProps = async ({ params, locale }) => {
  try {
    const post = await getContentBySlug('blog', params.slug as string, locale)

    return {
      props: { post },
    }
  } catch (error) {
    return {
      notFound: true,
    }
  }
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const localesPost = locales
    .map((locale) => {
      const posts = getFileSlugs('blog', locale)

      return posts.map((post) => [post, locale])
    })
    .flat()

  const paths = localesPost.map(([slug, locale]) => ({
    params: {
      slug: formatSlug(slug),
    },
    locale,
  }))

  return {
    paths,
    fallback: false,
  }
}

export default Blog
