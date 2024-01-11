import { allBlogPosts } from 'contentlayer/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { type Article, type WithContext } from 'schema-dts'

import site from '@/config/site'

import Comment from './comment'
import Content from './content'
import Footer from './footer'
import Header from './header'

// export const runtime = 'edge'

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
  const { params } = props

  const post = allBlogPosts.find((p) => p.slug === params.slug)

  if (!post) return {}

  const ISOPublishedTime = new Date(post.date).toISOString()
  const ISOModifiedTime = new Date(post.modifiedTime).toISOString()
  const previousTwitter = (await parent)?.twitter ?? {}

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `${site.url}/blog/${params.slug}`
    },
    openGraph: {
      url: `${site.url}/blog/${params.slug}`,
      type: 'article',
      title: post.title,
      siteName: site.name,
      description: post.summary,
      locale: 'en-US',
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: site.url,
      images: [
        {
          url: `${site.url}/api/og?title=${post.title}&date=${
            post.date.split('T')[0]
          }&url=honghong.me/blog`,
          width: 1200,
          height: 630,
          alt: post.title,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: post.title,
      description: post.summary,
      images: [
        `${site.url}/api/og?title=${post.title}&date=${
          post.date.split('T')[0]
        }&url=honghong.me/blog`
      ]
    }
  }
}

const BlogPostPage = (props: BlogPostPageProps) => {
  const { slug } = props.params

  const post = allBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const { title, summary, date, modifiedTime } = post

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
      <Content slug={slug} post={post} />
      <Footer slug={slug} modifiedTime={modifiedTime} />

      <Comment />
    </>
  )
}

export default BlogPostPage
