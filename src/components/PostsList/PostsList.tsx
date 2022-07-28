import { Box, Button, Title, useMantineTheme } from '@mantine/core'
import { useHover } from '@mantine/hooks'
import { motion } from 'framer-motion'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { ArrowRight } from 'tabler-icons-react'

import { isProd } from '@/lib/isProduction'
import { PostsListProps } from '@/lib/types'
import formatDate from '@/lib/utils/formatDate'

import { CloudinaryImg } from '@/components/Image'
import Link from '@/components/Link'
import ViewCounter from '@/components/ViewCounter'

import { useStyles } from './PostsList.styles'

export default function PostsList({ post }: PostsListProps) {
  const { t } = useTranslation()
  const { locale } = useRouter()
  const { slug, date, title, summary, image } = post
  const formattedSlug = slug.replace(`.${locale}`, '')
  const { hovered, ref } = useHover<HTMLAnchorElement>()
  const { classes } = useStyles()

  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  return (
    <motion.li
      key={formattedSlug}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: 0.8,
      }}
    >
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
              my={32}
              sx={(theme) => ({
                width: '100%',
                [theme.fn.largerThan('sm')]: {
                  margin: 0,
                  maxWidth: 384,
                },
              })}
            >
              <Link href={`/blog/${formattedSlug}`}>
                <CloudinaryImg
                  publicId={image}
                  alt={`${title} Cover`}
                  width={1280}
                  height={720}
                  className={classes.image}
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
                      href={`/blog/${formattedSlug}`}
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
                  href={`/blog/${formattedSlug}`}
                  aria-label={`Read "${title}"`}
                  rightIcon={
                    <motion.div animate={{ x: hovered ? 5 : 0 }}>
                      <ArrowRight size={20} />
                    </motion.div>
                  }
                  ref={ref}
                  sx={{
                    '&:hover': {
                      textDecoration: 'none',
                    },
                  }}
                >
                  {t('common:readMore')}
                </Button>
              </div>
            </Box>
          </Box>
        </Box>
      </article>
    </motion.li>
  )
}
