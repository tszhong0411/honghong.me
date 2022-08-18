import { Box, Button, List, Title, useMantineTheme } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { IconArrowRight } from '@tabler/icons'
import { motion } from 'framer-motion'
import useTranslation from 'next-translate/useTranslation'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React from 'react'

import formatDate from '@/lib/formatDate'
import { isProd } from '@/lib/isProduction'
import { PostFrontMatter } from '@/lib/types'

import Link from '@/components/Link'
import { useStyles } from '@/components/PostsList/PostsList.styles'
import ViewCounter from '@/components/ViewCounter'

export default function PostsList({ post }: { post: PostFrontMatter }) {
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const { slug, date, title, summary, image } = post
  const { hovered, ref } = useHover<HTMLAnchorElement>()
  const { classes } = useStyles()

  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <List.Item>
      <article>
        <Box py={48}>
          <div>
            <Box
              mb={16}
              sx={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <time dateTime={date}>{formatDate(date, locale)}</time>
              {' - '}
              {isProd && <ViewCounter slug={slug} text={false} type='GET' />}
            </Box>
          </div>
          <Box
            sx={(theme) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              [theme.fn.largerThan('md')]: {
                flexDirection: 'row',
              },
            })}
          >
            <Box
              mt={32}
              sx={(theme) => ({
                width: '100%',
                [theme.fn.largerThan('sm')]: {
                  margin: 0,
                  maxWidth: 384,
                },
              })}
            >
              <Link href={`/blog/${slug}`}>
                <Image
                  alt={`${title} Cover`}
                  className={classes.image}
                  src={'/static/images/blog/' + image}
                  blurDataURL={`/_next/image?url=${
                    '/static/images/blog/' + image
                  }&w=16&q=1`}
                  placeholder='blur'
                  width={1280}
                  height={720}
                />
              </Link>
            </Box>
            <Box
              py={32}
              sx={(theme) => ({
                display: 'flex',
                width: '100%',
                flex: '1 1 auto',
                flexDirection: 'column',
                gap: 8,
                [theme.fn.largerThan('sm')]: {
                  maxWidth: 384,
                },
                [theme.fn.largerThan('md')]: {
                  maxWidth: 'none',
                  padding: 32,
                },
              })}
            >
              <div>
                <div>
                  <Title order={2}>
                    <Link
                      href={`/blog/${slug}`}
                      sx={{
                        fontWeight: 700,
                        fontSize: 24,
                        color: dark ? 'white' : 'black',
                      }}
                    >
                      {title}
                    </Link>
                  </Title>
                </div>
                <Box mb={32} mt={24}>
                  {summary}
                </Box>
                <Button
                  component={Link}
                  href={`/blog/${slug}`}
                  aria-label={`Read "${title}"`}
                  rightIcon={
                    <motion.div animate={{ x: hovered ? 5 : 0 }}>
                      <IconArrowRight size={20} />
                    </motion.div>
                  }
                  ref={ref}
                  variant='gradient'
                  gradient={{ from: 'orange', to: 'red' }}
                  sx={{
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  {t('readMore')}
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </article>
    </List.Item>
  )
}
