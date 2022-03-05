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
import { Box } from '@/components/Box'
import { Flex } from '@/components/Flex'
import { css } from '@/lib/stitches.config'

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

const style = css({
  display: 'flex',
  flexDirection: 'column',
  gapY: '$1',
})

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
      <Box css={{ mt: '$6', mb: '$8' }}>
        <SkeletonTheme
          baseColor={theme === 'dark' || resolvedTheme === 'dark' ? '#202020' : '#d9d9d9'}
          highlightColor={theme === 'dark' || resolvedTheme === 'dark' ? '#444444' : '#ecebeb'}
        >
          <div>
            <Box css={{ mb: '$8', height: 'calc($11 + 1px)', '@md': { height: '$12' } }}>
              <Skeleton width={'100%'} height={'100%'} />
            </Box>
            <Flex direction={'row'} alignItems={'center'}>
              <Box
                css={{
                  mr: '$3',
                  height: 'calc($11 + 1px)',
                  width: 'calc($11 + 1px)',
                  '@md': { height: '$12', width: '$12' },
                }}
              >
                <Skeleton width={'100%'} height={'100%'} circle />
              </Box>
              <Flex direction={'column'}>
                <Skeleton width={'130px'} height={'20px'} />
                <Skeleton width={'130px'} height={'20px'} />
              </Flex>
            </Flex>
            <Box css={{ mt: '$8', mb: '$5' }}>
              <Skeleton width={'150px'} height={'32px'} />
            </Box>
            <Box css={{ mt: '$4' }}>
              <Skeleton width={'100%'} containerClassName={style()} count={8} height={'28px'} />
            </Box>
          </div>
        </SkeletonTheme>
      </Box>
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
            <Box css={{ my: '$12', ta: 'center' }}>
              <PageTitle>
                製作中{' '}
                <span role="img" aria-label="roadwork sign">
                  🚧
                </span>
              </PageTitle>
            </Box>
          )}
        </>
      )}
    </>
  )
}
