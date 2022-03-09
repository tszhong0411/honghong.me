/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferGetStaticPropsType } from 'next'

import PageTitle from '@/components/PageTitle'
import { sortedBlogPost, coreContent } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import getOgImage from '@/lib/generate-og-images'
import { useMDXComponent } from 'next-contentlayer/hooks'
import BlogLayout from '@/layouts/blog'
import components from 'components/MDXComponents'

export async function getStaticPaths() {
  return {
    paths: allBlogs.map((p) => ({
      params: { slug: [p.slug.split('.')[0]] },
      locale: p.slug.split('.')[p.slug.split('.').length - 1],
    })),
    fallback: false,
  }
}

export const getStaticProps = async ({ params, locale }) => {
  const slug = (params.slug as string[]).join('.')
  const sortedPosts = sortedBlogPost(
    allBlogs.filter((p) => p.slug.split('.')[p.slug.split('.').length - 1] === locale)
  )
  const postIndex = sortedPosts.findIndex((p) => p.slug === `${slug}.${locale}`)
  // TODO: Refactor this extraction of coreContent
  const prevContent = sortedPosts[postIndex + 1] || null
  const prev = prevContent ? coreContent(prevContent) : null
  const nextContent = sortedPosts[postIndex - 1] || null
  const next = nextContent ? coreContent(nextContent) : null
  const post = sortedPosts.find((p) => p.slug === `${slug}.${locale}`)

  const ogImage = await getOgImage({
    slug: `${slug}.${locale}`,
    background: post.colorFeatured,
    color: post.fontFeatured,
  })

  return {
    props: {
      post,
      prev,
      next,
      ogImage,
    },
  }
}

export default function Blog({
  post,
  prev,
  next,
  ogImage,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const Component = useMDXComponent(post.body.code)

  return (
    <>
      {post && (
        <>
          {post.draft !== true ? (
            <BlogLayout content={post} prev={prev} next={next} ogImage={ogImage}>
              <Component
                components={
                  {
                    ...components,
                  } as any
                }
              />
            </BlogLayout>
          ) : (
            <div className="my-24 text-center">
              <PageTitle>
                製作中{' '}
                <span role="img" aria-label="roadwork sign">
                  🚧
                </span>
              </PageTitle>
            </div>
          )}
        </>
      )}
    </>
  )
}
