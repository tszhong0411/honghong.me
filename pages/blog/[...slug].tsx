/* eslint-disable @typescript-eslint/no-explicit-any */
import { InferGetStaticPropsType } from 'next'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { useRouter } from 'next/router'

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
  const [mounted, setMounted] = useState(false)
  const { theme, resolvedTheme } = useTheme()
  const router = useRouter()
  const Component = useMDXComponent(post.body.code)

  // When mounted on client, now we can show the UI
  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  if (router.isFallback) {
    return (
      <div className="mt-8 mb-12">
        <SkeletonTheme
          baseColor={theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'}
          highlightColor={theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'}
        >
          <div>
            <div className="mb-12 h-11 md:h-24">
              <Skeleton width={'100%'} height={'100%'} />
            </div>
            <div className="flex flex-row items-center">
              <div className="mr-3 h-11 w-11 md:h-12 md:w-12">
                <Skeleton width={'100%'} height={'100%'} circle />
              </div>
              <div className="flex flex-col">
                <Skeleton width={'130px'} height={'20px'} />
                <Skeleton width={'130px'} height={'20px'} />
              </div>
            </div>
            <div className="mt-12 mb-6">
              <Skeleton width={'150px'} height={'32px'} />
            </div>
            <div className="mt-4">
              <Skeleton
                width={'100%'}
                containerClassName="flex flex-col gap-y"
                count={8}
                height={'28px'}
              />
            </div>
          </div>
        </SkeletonTheme>
      </div>
    )
  }

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
