import {
  Box,
  Button,
  Divider,
  Title,
  useMantineColorScheme,
} from '@mantine/core'
import { useWindowEvent } from '@mantine/hooks'
import {
  IconBrandFacebook,
  IconBrandReddit,
  IconBrandTwitter,
} from '@tabler/icons'
import { useRouter } from 'next/router'
import { MDXRemoteSerializeResult } from 'next-mdx-remote'
import { ArticleJsonLd } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { isProduction } from '@/lib/constants'
import useFormattedDate from '@/hooks/useFormattedDate'
import { useScrollSpy } from '@/hooks/useScrollspy'

import Comment from '@/components/Comment'
import Layout from '@/components/Layout'
import LikeButton from '@/components/LikeButton'
import Link from '@/components/Link'
import ReadingProgressBar from '@/components/ReadingProgressBar'
import ScrollTopAndComment from '@/components/ScrollTopAndComment'
import TableOfContents from '@/components/TableOfContents'
import { HeadingScrollSpy } from '@/components/TableOfContents/TableOfContent'
import ViewCounter from '@/components/ViewCounter'

import { useStyles } from '@/layouts/blog.styles'
import { PostFrontMatter } from '@/pages/blog'

type PostProps = {
  source: MDXRemoteSerializeResult
  frontMatter: PostFrontMatter
}

export type BlogPostProps = {
  post: PostProps
}

type BlogProps = {
  children: React.ReactNode
} & BlogPostProps

const editUrl = (slug: string, locale: string) =>
  `https://github.com/tszhong0411/honghong.me/blob/main/src/data/blog/${locale}/${slug}.mdx`

const twitterShare = (slug: string, title: string) =>
  `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const facebookShare = (slug: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const redditShare = (slug: string, title: string) =>
  `https://www.reddit.com/submit?title=${title}&url=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const BlogLayout = (props: BlogProps) => {
  const { post, children } = props
  const { date, title, summary, slug, modifiedTime } = post.frontMatter
  const { t } = useTranslation('common')
  const { locale } = useRouter()
  const [totalCommentCount, setTotalCommentCount] = React.useState<number>(0)
  const { classes } = useStyles()
  const activeSection = useScrollSpy()
  const [toc, setToc] = React.useState<HeadingScrollSpy>()
  const minLevel =
    toc?.reduce((min, item) => (item.level < min ? item.level : min), 10) ?? 0
  const { pathname } = useRouter()
  const { colorScheme } = useMantineColorScheme()
  const dark = colorScheme === 'dark'

  const ISOPublishedTime = new Date(date).toISOString()
  const ISOModifiedTime = new Date(modifiedTime).toISOString()

  const formattedDate = useFormattedDate(new Date(ISOPublishedTime), locale)

  React.useEffect(() => {
    const headings = document.querySelectorAll(
      '#blog-content h2, #blog-content h3'
    )

    const headingArr: HeadingScrollSpy = []
    headings.forEach((heading) => {
      const id = heading.id
      const level = +heading.tagName.replace('H', '')
      const text = heading.textContent

      headingArr.push({ id, level, text })
    })

    setToc(headingArr)
  }, [locale])

  useWindowEvent('message', (event) => {
    if (event.origin !== 'https://giscus.app') return
    if (!(typeof event.data === 'object' && event.data.giscus)) return

    const giscusData = event.data.giscus.discussion

    giscusData &&
      setTotalCommentCount(
        giscusData.totalCommentCount + giscusData.totalReplyCount
      )
  })

  return (
    <Layout
      title={title}
      description={summary}
      openGraph={{
        description: summary,
        type: 'article',
        title: `${title} | 小康 Blog`,
        article: {
          publishedTime: ISOPublishedTime,
          modifiedTime: ISOModifiedTime,
          authors: ['https://honghong.me'],
        },
        images: [
          {
            url: `https://honghong.me/api/og?title=${title}&publishDate=${date}`,
            alt: title,
            width: 1200,
            height: 630,
            type: 'image/png',
          },
        ],
      }}
    >
      <ArticleJsonLd
        url={`https://honghong.me${pathname}`}
        title={title}
        datePublished={date}
        modifiedTime={ISOModifiedTime}
        description={summary}
        authorName={{
          name: '小康',
          url: 'https://honghong.me',
        }}
        publisherLogo='https://honghong.me/static/images/logo/logo-black.png'
        publisherName='小康'
        type='Article'
        images={[
          `https://honghong.me/api/og?title=${title}&publishDate=${date}`,
        ]}
      />
      <ScrollTopAndComment />
      <time dateTime={ISOPublishedTime}>{formattedDate}</time>
      <Title order={1} mb={16}>
        {title}
      </Title>
      <div className={classes.analytics}>
        {isProduction && <ViewCounter slug={slug} />} /
        <span>
          {totalCommentCount} {t('comments')}
        </span>
      </div>
      <Divider />
      <Box mt={32} className={classes.contentWrapper}>
        <article id='blog-content'>{children}</article>
        <aside className={classes.aside}>
          <div className={classes.asideContainer}>
            <TableOfContents
              toc={toc}
              minLevel={minLevel}
              activeSection={activeSection}
            />
            <LikeButton slug={slug} />
          </div>
        </aside>
      </Box>
      <Divider mt={32} />
      <div className={classes.postBottom}>
        <div>
          <Link
            href={editUrl(slug, locale)}
            sx={() => ({
              fontSize: 14,
              color: dark ? 'white' : 'black',

              '&:hover': {
                textDecoration: 'none',
              },
            })}
          >
            {t('editOnGithub')}
          </Link>
        </div>
        <div>
          <Button
            component='a'
            target='_blank'
            variant='outline'
            rel='noopener noreferrer'
            href={redditShare(slug, title)}
            className={classes.shareButton}
          >
            <IconBrandReddit size={18} />
          </Button>
          <Button
            component='a'
            target='_blank'
            variant='outline'
            rel='noopener noreferrer'
            href={twitterShare(slug, title)}
            className={classes.shareButton}
          >
            <IconBrandTwitter size={18} />
          </Button>
          <Button
            component='a'
            target='_blank'
            variant='outline'
            rel='noopener noreferrer'
            href={facebookShare(slug)}
            className={classes.shareButton}
          >
            <IconBrandFacebook size={18} />
          </Button>
        </div>
      </div>
      <Divider mb={32} />
      <Comment />
      <ReadingProgressBar />
      <ScrollTopAndComment />
    </Layout>
  )
}

export default BlogLayout
