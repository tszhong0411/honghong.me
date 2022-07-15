import { Box, Button, Divider, useMantineTheme } from '@mantine/core'
import type { Blog } from 'contentlayer/generated'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'
import { BrandFacebook, BrandTwitter } from 'tabler-icons-react'

import { isProd } from '@/lib/isProduction'
import { CoreContent } from '@/lib/utils/contentlayer'
import formatDate from '@/lib/utils/formatDate'
import useScrollSpy from '@/hooks/useScrollspy'

import Comment from '@/components/Comment'
import Layout from '@/components/Layout'
import Link from '@/components/Link'
import NextPrevPost from '@/components/NextPrevPost'
import PageTitle from '@/components/PageTitle'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import TableOfContents from '@/components/TableOfContents'
import { HeadingScrollSpy } from '@/components/TableOfContents/types'
import ViewCounter from '@/components/ViewCounter'

import useStyles from './blog.styles'

const editUrl = (slug: string) =>
  `https://github.com/tszhong0411/honghong.me/blob/main/src/data/blog/${slug}.mdx`

const twitterShare = (slug: string) =>
  `https://twitter.com/intent/tweet?url=${encodeURIComponent(
    `https://honghong.me/blog/${slug.split('.')[0]}`
  )}`

const facebookShare = (slug: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://honghong.me/blog/${slug.split('.')[0]}`
  )}`

type Props = {
  content: CoreContent<Blog>
  next?: { slug: string; title: string; summary: string }
  prev?: { slug: string; title: string; summary: string }
  children: React.ReactNode
}

export default function BlogLayout({ content, next, prev, children }: Props) {
  const { slug, date, title, summary } = content
  const { t } = useTranslation()
  const { locale } = useRouter()
  const [totalCommentCount, setTotalCommentCount] = React.useState<number>(0)
  const { classes } = useStyles()
  const { colorScheme } = useMantineTheme()
  const dark = colorScheme === 'dark'

  //#region  //*=========== Scrollspy ===========
  const activeSection = useScrollSpy()
  const [toc, setToc] = React.useState<HeadingScrollSpy>()
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0

  React.useEffect(() => {
    const headings = document.querySelectorAll(
      '#blog-content h2, #blog-content h3'
    )

    const headingArr: HeadingScrollSpy = []
    headings.forEach((heading) => {
      const id = heading.id
      const level = +heading.tagName.replace('H', '')
      const text = heading.textContent + ''

      headingArr.push({ id, level, text })
    })

    setToc(headingArr)
  }, [slug])
  //#endregion //*=========== Srcollspy ===========

  React.useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.origin !== 'https://giscus.app') return
      if (!(typeof event.data === 'object' && event.data.giscus)) return

      const giscusData = event.data.giscus.discussion

      giscusData &&
        setTotalCommentCount(
          giscusData.totalCommentCount + giscusData.totalReplyCount
        )
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])
  return (
    <Layout
      title={`${title}`}
      summary={summary}
      image={`https://og.honghong.me/api/blog?theme=dark&title=${title}&description=${summary}`}
      date={new Date(date).toISOString()}
      type='article'
    >
      <ScrollTopAndComment />
      <Box mb={48}>
        <PageTitle>{title}</PageTitle>
      </Box>
      <div className={classes.author}>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
          className={classes.avatar}
        >
          <Image
            src='/static/images/logo/logo-black.png'
            width={48}
            height={48}
            alt='avatar'
          />
        </motion.div>
        <div>
          小康
          <div>
            <Link
              href='https://instagram.com/tszhong0411'
              sx={(theme) => ({
                fontSize: 14,
                [theme.fn.largerThan('sm')]: {
                  fontSize: 16,
                },
              })}
              noIcon
            >
              @tszhong0411
            </Link>
          </div>
        </div>
      </div>
      <div className={classes.analytics}>
        {isProd && <ViewCounter slug={slug} />}•
        <time dateTime={date}>{formatDate(new Date(date), locale)}</time>•
        <span>
          {totalCommentCount} {t('common:comments')}
        </span>
      </div>
      <Divider />
      <Box mt={32}>
        <article id='blog-content'>{children}</article>
      </Box>
      <Divider mt={32} />
      <div className={classes.postBottom}>
        <div className={classes.postBottomLeft}>
          <Link
            href={editUrl(slug)}
            sx={() => ({
              fontSize: 14,
              color: dark ? 'white' : 'black',
              '&:hover': {
                textDecoration: 'none',
              },
            })}
          >
            {t('common:editOnGithub')}
          </Link>
        </div>
        <div className={classes.postBottomRight}>
          <Button
            component='a'
            target='_blank'
            variant='outline'
            rel='noopener noreferrer'
            href={twitterShare(slug)}
            sx={() => ({
              border: 0,
              height: 44,
              width: 44,
              padding: 0,
            })}
          >
            <BrandTwitter size={18} />
          </Button>
          <Button
            component='a'
            target='_blank'
            variant='outline'
            rel='noopener noreferrer'
            href={facebookShare(slug)}
            sx={() => ({
              border: 0,
              height: 44,
              width: 44,
              padding: 0,
            })}
          >
            <BrandFacebook size={18} />
          </Button>
        </div>
      </div>
      <Divider mb={32} />
      <Comment />
      <Divider />
      <Box mt={64}>
        <Box
          sx={(theme) => ({
            display: 'flex',
            flexDirection: 'column',
            [theme.fn.largerThan('sm')]: {
              flexDirection: 'row',
            },
          })}
        >
          {(next || prev) && (
            <>
              {prev && (
                <NextPrevPost
                  heading={t('common:prev')}
                  title={prev.title}
                  summary={prev.summary}
                  slug={prev.slug.replace(`.${locale}`, '')}
                />
              )}
              {next && (
                <>
                  <Divider
                    sx={(theme) => ({
                      height: 'auto',
                      margin: 0,
                      display: 'none',
                      [theme.fn.largerThan('sm')]: {
                        margin: '0 32px',
                        display: 'block',
                      },
                    })}
                    orientation='vertical'
                  />
                  <Divider
                    sx={(theme) => ({
                      height: 'auto',
                      margin: 0,
                      [theme.fn.largerThan('sm')]: {
                        margin: '0 32px',
                        display: 'none',
                      },
                    })}
                    orientation='horizontal'
                  />
                </>
              )}
              {next && (
                <NextPrevPost
                  heading={t('common:next')}
                  title={next.title}
                  summary={next.summary}
                  slug={next.slug.replace(`.${locale}`, '')}
                />
              )}
            </>
          )}
        </Box>
      </Box>
      <AnimatePresence>
        <ScrollTopAndComment />
      </AnimatePresence>
      <TableOfContents
        toc={toc}
        minLevel={minLevel}
        activeSection={activeSection}
      />
    </Layout>
  )
}
