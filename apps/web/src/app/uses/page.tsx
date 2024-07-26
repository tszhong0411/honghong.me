import { allPages } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import type { WebPage, WithContext } from 'schema-dts'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'
import { SITE_TITLE, SITE_URL } from '@/lib/constants'

const title = 'Uses'
const description =
  'This is the equipment I currently use for gaming, programming, making videos, and every day.'

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
      canonical: '/uses'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/uses',
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

const jsonLd: WithContext<WebPage> = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  name: title,
  description,
  url: `${SITE_URL}/uses`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: SITE_URL
  }
}

const Page = () => {
  const page = allPages.find((p) => p.slug === 'uses')

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
