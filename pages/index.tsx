import Hero from '@/components/Hero'
import Link from '@/components/Link'

import Container from '@/components/Container'
import formatDate from '@/lib/utils/formatDate'
import Image from 'next/image'
import useTranslation from 'next-translate/useTranslation'
import { InferGetStaticPropsType } from 'next'
import { sortedBlogPost } from '@/lib/utils/contentlayer'
import { allBlogs } from 'contentlayer/generated'
import { useRouter } from 'next/router'
import { Box } from '@/components/Box'
import List from '@/components/List'
import { Text } from '@/components/Text'
import { Flex } from '@/components/Flex'
import { css } from '@/lib/stitches.config'

const MAX_DISPLAY = 3

export const getStaticProps = async (locale: { locale: string }) => {
  const sortedPosts = sortedBlogPost(allBlogs)
  const filteredPosts = sortedPosts.filter(
    (slug) => slug.slug.split('.')[slug.slug.split('.').length - 1] === locale.locale
  )

  return { props: { filteredPosts } }
}

const PostCover = css({
  transition: '0.5s',
  borderRadius: '$4',
  '&:hover': {
    transform: 'scale(1.1)',
  },
})

export default function Home({ filteredPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  const { t } = useTranslation()
  const { locale } = useRouter()

  return (
    <Container>
      <Box css={{ divideY: '1px' }}>
        <Box css={{ pt: '$5', pb: '$6', spaceY: '$2', '@md': { spaceY: 'calc($5 - 4px)' } }}>
          <Hero />
          <Text size={7} as="h2">
            {t('common:latestPosts')}
          </Text>
        </Box>
        <List as="ul" css={{ divideY: '1px' }}>
          {!filteredPosts && !filteredPosts.length && (
            <Text size={7} as="p">
              {t('common:noPostsFound')}
            </Text>
          )}
          {filteredPosts.slice(0, 3).map((post) => {
            const { slug, date, title, summary, image } = post
            const formattedSlug = slug.replace(`.${locale}`, '')
            return (
              <List key={formattedSlug} css={{ py: '$8' }} as="li">
                <article>
                  <Box
                    css={{
                      spaceY: '$4',
                      '@xl': {
                        display: 'grid',
                        gridTemplateColumns: 'repeat(3, 1fr)',
                      },
                    }}
                  >
                    <dl>
                      <dt className="sr-only">{t('common:publishedOn')}</dt>
                      <dd>
                        <time dateTime={date}>{formatDate(date, locale)}</time>
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
        </List>
      </Box>
      {filteredPosts.length > MAX_DISPLAY && (
        <Flex justifyContent={'end'}>
          <Link href="/blog" variant="red" underline aria-label="all posts">
            {t('common:allPosts')} &rarr;
          </Link>
        </Flex>
      )}
    </Container>
  )
}
