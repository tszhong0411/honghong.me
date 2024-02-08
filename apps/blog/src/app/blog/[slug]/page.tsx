import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import React from 'react'
import { type Article, type WithContext } from 'schema-dts'

import Comments from '@/components/comments'
import CommentsLoading from '@/components/comments/comments-loading'
import site from '@/config/site'
import { type BlogMetadata, getAllPages, getPage } from '@/lib/mdx'

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
  return getAllPages<BlogMetadata>('blog').map((post) => ({
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

  const post = getPage<BlogMetadata>(`blog/${slug}`)

  if (!post) return {}

  const { date, modifiedTime, title, summary } = post.metadata

  const ISOPublishedTime = new Date(date).toISOString()
  const ISOModifiedTime = new Date(modifiedTime).toISOString()
  const previousTwitter = (await parent)?.twitter ?? {}

  return {
    title: title,
    description: summary,
    alternates: {
      canonical: `${site.url}/blog/${slug}`
    },
    openGraph: {
      url: `${site.url}/blog/${slug}`,
      type: 'article',
      title: title,
      siteName: site.name,
      description: summary,
      locale: 'en-US',
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: site.url,
      images: [
        {
          url: `${site.url}/api/og?title=${title}&date=${
            date.split('T')[0]
          }&url=honghong.me/blog`,
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
        `${site.url}/api/og?title=${title}&date=${
          date.split('T')[0]
        }&url=honghong.me/blog`
      ]
    }
  }
}

const BlogPostPage = (props: BlogPostPageProps) => {
  const {
    params: { slug }
  } = props

  const post = getPage<BlogMetadata>(`blog/${slug}`)

  if (!post) {
    notFound()
  }

  const {
    metadata: { title, summary, date, modifiedTime },
    content
  } = post

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',

    headline: title,
    description: summary,
    datePublished: date,
    dateModified: modifiedTime,
    image: `${site.url}/api/og?title=${title}&date=${
      date.split('T')[0]
    }&url=honghong.me/blog`,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url
    },
    publisher: {
      '@type': 'Person',
      name: site.name,
      url: site.url
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <Header date={date} title={title} slug={slug} />
      <Content slug={slug} content={content} />
      <Footer slug={slug} modifiedTime={modifiedTime} />

      <React.Suspense fallback={<CommentsLoading />}>
        <Comments slug={slug} />
      </React.Suspense>
    </>
  )
}

export default BlogPostPage
