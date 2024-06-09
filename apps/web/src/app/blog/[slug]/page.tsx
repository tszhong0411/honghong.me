import { flags } from '@tszhong0411/env'
import { allBlogPosts } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type Article, type WithContext } from 'schema-dts'

import Comments from '@/components/comments'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

import Content from './content'
import Footer from './footer'
import Header from './header'

type BlogPostPageProps = {
  params: {
    slug: string
  }
  searchParams: Record<string, never>
}

export const generateStaticParams = (): Array<BlogPostPageProps['params']> => {
  return allBlogPosts.map((post) => ({
    slug: post.slug
  }))
}

export const generateMetadata = async (
  props: BlogPostPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const {
    params: { slug }
  } = props

  const post = allBlogPosts.find((p) => p.slug === slug)

  if (!post) return {}

  const { date, modifiedTime, title, summary } = post

  const ISOPublishedTime = new Date(date).toISOString()
  const ISOModifiedTime = new Date(modifiedTime).toISOString()
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}

  return {
    title: title,
    description: summary,
    alternates: {
      canonical: `/blog/${slug}`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `/blog/${slug}`,
      type: 'article',
      title: title,
      description: summary,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: SITE_URL,
      images: [
        {
          url: `/og/${slug}`,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: title,
      description: summary,
      images: [
        {
          url: `/og/${slug}`,
          width: 1200,
          height: 630,
          alt: title
        }
      ]
    }
  }
}

const BlogPostPage = (props: BlogPostPageProps) => {
  const {
    params: { slug }
  } = props

  const post = allBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const { title, summary, date, modifiedTime, body } = post

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',

    headline: title,
    description: summary,
    datePublished: date,
    dateModified: modifiedTime,
    image: `${SITE_URL}/og/${slug}`,
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    },
    publisher: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header date={date} title={title} slug={slug} />
      <Content slug={slug} content={body} />
      <Footer slug={slug} modifiedTime={modifiedTime} />

      {flags.comment ? <Comments slug={slug} /> : null}
    </>
  )
}

export default BlogPostPage
