import { allBlogPosts } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Article, WithContext } from 'schema-dts'

import Comment from '@/components/Comment'

import { site } from '@/config/site'

import Content from './components/Content'
import Footer from './components/Footer'
import Header from './components/Header'

type BlogPostPageProps = {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

export const generateMetadata = (props: BlogPostPageProps): Metadata => {
  const { params } = props

  const post = allBlogPosts.find((post) => post.slug === params.slug)

  if (!post) {
    return {}
  }

  const ISOPublishedTime = new Date(post.date).toISOString()
  const ISOModifiedTime = new Date(post.modifiedTime).toISOString()

  return {
    title: post.title,
    description: post.summary,
    alternates: {
      canonical: `${site.url}/blog/${params.slug}`,
    },
    openGraph: {
      description: post.summary,
      type: 'article',
      title: `${post.title} ${site.titleTemplate}`,
      publishedTime: ISOPublishedTime,
      modifiedTime: ISOModifiedTime,
      authors: site.url,
      images: {
        url: `${site.url}/api/og?title=${post.title}&data=${post.date}`,
        alt: post.title,
        width: 1200,
        height: 630,
        type: 'image/png',
      },
    },
  }
}

const BlogPostPage = (props: BlogPostPageProps) => {
  const { slug } = props.params

  const post = allBlogPosts.find((post) => post.slug === slug)

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
    image: `${site.url}/api/og?title=${title}&date=${date}`,
    author: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
    publisher: {
      '@type': 'Person',
      name: site.name,
      url: site.url,
    },
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Main */}
      <Header date={date} title={title} slug={slug} />
      <Content slug={slug} post={post} />
      <Footer slug={slug} title={title} />

      <Comment />
    </>
  )
}

export default BlogPostPage
