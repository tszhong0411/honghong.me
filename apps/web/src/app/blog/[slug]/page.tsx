import { flags } from '@tszhong0411/env'
import { getTOC } from '@tszhong0411/mdx'
import { allBlogPosts } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'
import { type Article, type WithContext } from 'schema-dts'

import Comments from '@/components/comments'
import Mdx from '@/components/mdx'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

import Footer from './footer'
import Header from './header'
import LikeButton from './like-button'
import MobileTableOfContents from './mobile-table-of-contents'
import ProgressBar from './progress-bar'
import Providers from './providers'
import TableOfContents from './table-of-contents'

type PageProps = {
  params: {
    slug: string
  }
  searchParams: Record<string, never>
}

export const generateStaticParams = (): Array<PageProps['params']> => {
  return allBlogPosts.map((post) => ({
    slug: post.slug
  }))
}

export const generateMetadata = async (
  props: PageProps,
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

const Page = async (props: PageProps) => {
  const {
    params: { slug }
  } = props

  const post = allBlogPosts.find((p) => p.slug === slug)

  if (!post) {
    notFound()
  }

  const { title, summary, date, modifiedTime, body } = post

  const toc = await getTOC(body)

  const jsonLd: WithContext<Article> = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    name: title,
    description: summary,
    url: `${SITE_URL}/blog/${slug}`,
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

      <Providers post={post}>
        <Header />

        <div className='mt-8 flex flex-col justify-between lg:flex-row'>
          <article className='w-full lg:w-[670px]'>
            <Mdx content={body} />
          </article>
          <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
            <div className='sticky top-24'>
              {toc.length > 0 ? <TableOfContents toc={toc} /> : null}
              {flags.likeButton ? <LikeButton slug={slug} /> : null}
            </div>
          </aside>
        </div>
        <ProgressBar />

        {toc.length > 0 ? <MobileTableOfContents toc={toc} /> : null}
        <Footer />
      </Providers>

      {flags.comment ? (
        <Suspense>
          <Comments slug={slug} />
        </Suspense>
      ) : null}
    </>
  )
}

export default Page
