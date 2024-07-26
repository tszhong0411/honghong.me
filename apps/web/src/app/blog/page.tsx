import { allBlogPosts } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import type { Blog, WithContext } from 'schema-dts'

import FilteredPosts from '@/components/filtered-posts'
import PageTitle from '@/components/page-title'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

const title = 'Blog'
const description =
  'My personal website and blog where I share my thoughts on various topics including tutorials, notes, and personal experiences. As a full-stack developer from Hong Kong, I started learning web development as a hobby in December 2020. I use Next.js for building websites, GitHub for code hosting, and Vercel for deployment. Explore my site to learn more about my Journey and discover some of the web development resources that have inspired me.'

type PageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

const jsonLd: WithContext<Blog> = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  '@id': `${SITE_URL}/blog`,
  name: title,
  description,
  url: `${SITE_URL}/blog`,
  author: {
    '@type': 'Person',
    name: SITE_NAME,
    url: SITE_URL
  },
  blogPost: allBlogPosts.map((post) => ({
    '@type': 'BlogPosting',
    headline: post.title,
    url: `${SITE_URL}/blog/${post.slug}`,
    datePublished: post.date,
    dateModified: post.modifiedTime
  }))
}

export const generateMetadata = async (
  _: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}

  return {
    title,
    description,
    alternates: {
      canonical: '/blog'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/blog',
      title,
      description
    },
    twitter: {
      ...previousTwitter,
      title,
      description
    }
  }
}

const Page = () => {
  const posts = allBlogPosts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <FilteredPosts posts={posts} />
    </>
  )
}

export default Page
