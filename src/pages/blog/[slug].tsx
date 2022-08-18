/* eslint-disable @typescript-eslint/no-explicit-any */
import { GetStaticPaths, GetStaticProps } from 'next'
import { MDXRemote } from 'next-mdx-remote'

import { getOgImage } from '@/lib/getOgImage'
import { formatSlug, getContentBySlug, getFileSlugs } from '@/lib/mdx'
import { BlogPostProps, PostFrontMatter } from '@/lib/types'

import MDXComponents from '@/components/MDXComponents'
import Typography from '@/components/Typography'

import BlogLayout from '@/layouts/blog'

export default function Blog({ post, ogImage }: BlogPostProps) {
  return (
    <BlogLayout post={post} ogImage={ogImage}>
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
  // try {
  const post = await getContentBySlug('blog', params.slug as string, locale)

  const frontMatter = post.frontMatter as PostFrontMatter

  const ogImage = await getOgImage(
    `/blog?title=${frontMatter.title}&description=${frontMatter.summary}`
  )

  console.log(post)

  return {
    props: { post, ogImage },
  }
  // } catch (error) {
  //   return {
  //     notFound: true,
  //   }
  // }
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
