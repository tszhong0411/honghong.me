import { allPages } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'

import { site } from '@/config/site'

const title = 'Uses'
const description =
  'This is the equipment I currently use for gaming, programming, making videos, and every day.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${site.url}/uses`,
  },
  openGraph: {
    url: `${site.url}/uses`,
    type: 'website',
    title,
    siteName: site.title,
    description,
    locale: 'en-US',
    images: [
      {
        url: `${site.url}/static/images/og/og.png`,
        width: 1200,
        height: 630,
        alt: description,
        type: 'image/png',
      },
    ],
  },
}

const getPage = () => {
  const page = allPages.find((page) => page.slug === 'uses')

  if (!page) {
    return notFound()
  }

  return page
}

const UsesPage = () => {
  const page = getPage()

  return (
    <>
      <PageTitle
        title='Uses'
        description='This is the equipment I currently use for gaming, programming, making
        videos, and every day.'
      />
      <Mdx code={page.body.code} />
    </>
  )
}

export default UsesPage
