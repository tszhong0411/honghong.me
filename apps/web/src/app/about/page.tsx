import { allPages } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import type { AboutPage, WithContext } from 'schema-dts'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'
import {
  SITE_DESCRIPTION,
  SITE_FACEBOOK_URL,
  SITE_GITHUB_URL,
  SITE_INSTAGRAM_URL,
  SITE_NAME,
  SITE_URL,
  SITE_X_URL,
  SITE_YOUTUBE_URL
} from '@/lib/constants'

const title = 'About'
const description = '👋 Hi there! I am Hong, a student who loves web development.'

type PageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
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
      canonical: '/about'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/about',
      type: 'profile',
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

const jsonLd: WithContext<AboutPage> = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  name: title,
  description,
  url: `${SITE_URL}/about`,
  mainEntity: {
    '@type': 'Person',
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    sameAs: [SITE_FACEBOOK_URL, SITE_INSTAGRAM_URL, SITE_X_URL, SITE_GITHUB_URL, SITE_YOUTUBE_URL]
  }
}

const Page = () => {
  const page = allPages.find((p) => p.slug === 'about')

  if (!page) {
    return notFound()
  }

  const { body } = page

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <Mdx content={body} />
    </>
  )
}

export default Page
