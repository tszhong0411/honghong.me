import useTranslation from 'next-translate/useTranslation'
import { InferGetStaticPropsType } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'

import Link from '@/components/Link'
import formatDate from '@/lib/utils/formatDate'
import { allBlogs } from 'contentlayer/generated'
import { sortedBlogPost, allCoreContent } from '@/lib/utils/contentlayer'
import Container from '@/components/Container'
import { Flex } from '@/components/Flex'
import { Text } from '@/components/Text'
import { Box } from '@/components/Box'
import { Input } from './../components/Input/Input'
import List from '@/components/List'
import { css } from '@/lib/stitches.config'

export const POSTS_PER_PAGE = 10

export const getStaticProps = async (locale: { locale: string }) => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const posts = allCoreContent(sortedPosts)
  const filteredPosts = posts.filter(
    (slug) => slug.slug.split('.')[slug.slug.split('.').length - 1] === locale.locale
  )

  return {
    props: {
      filteredPosts,
    },
  }
}

const PostCover = css({
  transition: '0.5s',
  borderRadius: '$4',
  '&:hover': {
    transform: 'scale(1.1)',
  },
})

export default function Blog({ filteredPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()
  const [searchValue, setSearchValue] = useState('')
  const filteredBlogPosts = filteredPosts?.filter((post) => {
    const searchContent = post.title + post.summary
    return searchContent.toLowerCase().includes(searchValue.toLowerCase())
  })

  const router = useRouter()
  const displayPosts = filteredBlogPosts

  return (
    <Container title="Blog - 小康">
      <Flex direction={'column'} justifyContent={'center'} css={{ mx: 'auto' }}>
        <Text
          size={7}
          as="h1"
          css={{
            mb: '$6',
            fontWeight: 700,
            '@md': {
              fontSize: '$5xl',
            },
          }}
        >
          Blog
        </Text>
        <Text size={3} as="p" css={{ mb: '$4', color: '$honghong-colors-typeface-tertiary' }}>
          {t('common:blogDesc', { count: filteredPosts?.length })}
        </Text>
        <Box
          css={{
            spaceY: '$2',
            '@md': {
              spaceY: 'calc($5 - 2px)',
            },
          }}
        >
          <Box css={{ position: 'relative' }}>
            <Input
              aria-label={t('common:search')}
              type="text"
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder={t('common:search')}
            />
            <Box
              as="svg"
              css={{
                position: 'absolute',
                right: '$3',
                top: '$3',
                height: 'calc($5 - 2px)',
                width: 'calc($5 - 2px)',
                color: '$honghong-colors-typeface-secondary',
              }}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </Box>
          </Box>
        </Box>
        <ul>
          {!filteredBlogPosts?.length && (
            <Text
              size={3}
              as="p"
              css={{
                p: '$4',
              }}
            >
              {t('common:noPostsFound')}
            </Text>
          )}
          {displayPosts?.map((post) => {
            const { slug, date, title, summary, image } = post
            const formattedSlug = slug.replace(`.${router.locale}`, '')
            return (
              <List key={formattedSlug} css={{ py: '$8' }} as="li">
                <article>
                  <Box
                    css={{
                      spaceY: '$4',
                      '@xl': { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' },
                    }}
                  >
                    <dl>
                      <dt className="sr-only">{t('common:publishedOn')}</dt>
                      <dd>
                        <time dateTime={date}>{formatDate(date, router.locale)}</time>
                      </dd>
                    </dl>
                    <Flex
                      direction={'column'}
                      alignItems={'flex-start'}
                      css={{
                        '@sm': {
                          flexDirection: 'row',
                        },
                        '@xl': {
                          gridColumn: 'span 3 / span 3',
                        },
                      }}
                    >
                      <Box
                        css={{
                          mx: '$2',
                          my: '$6',
                          width: '100%',
                          '@sm': {
                            my: 0,
                            width: 'calc(100% / 3)',
                          },
                        }}
                      >
                        <Link href={`/blog/${formattedSlug}`}>
                          <Box
                            css={{
                              overflow: 'hidden',
                              px: '$6',
                              '@sm': {
                                px: 0,
                              },
                            }}
                          >
                            <Image
                              src={image}
                              alt="Cover"
                              height={720}
                              width={1280}
                              className={PostCover()}
                            />
                          </Box>
                        </Link>
                      </Box>
                      <Box
                        css={{
                          mx: '$2',
                          width: '100%',
                          '@sm': {
                            width: 'calc(100% * (2/3))',
                          },
                        }}
                      >
                        <Box css={{ spaceY: '$5' }}>
                          <div>
                            <Text
                              size={6}
                              as="h2"
                              css={{
                                fontWeight: 700,
                              }}
                            >
                              <Link
                                href={`/blog/${formattedSlug}`}
                                data-cy="post-title"
                                variant={'red'}
                                underline
                              >
                                {title}
                              </Link>
                            </Text>
                          </div>
                          <Box
                            css={{
                              color: '$honghong-colors-typeface-secondary',
                              mb: '$6',
                            }}
                          >
                            {summary}
                          </Box>
                          <Link
                            href={`/blog/${formattedSlug}`}
                            aria-label={`Read "${title}"`}
                            underline
                            variant="red"
                          >
                            {t('common:readMore')} &rarr;
                          </Link>
                        </Box>
                      </Box>
                    </Flex>
                  </Box>
                </article>
              </List>
            )
          })}
        </ul>
      </Flex>
    </Container>
  )
}
