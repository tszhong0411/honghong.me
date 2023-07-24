import type { Metadata } from 'next'

import getPage from '@/lib/get-page'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'

import { site } from '@/config/site'

const title = 'About'
const description = 'A student who loves web development.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${site.url}/about`,
  },
  openGraph: {
    url: `${site.url}/about`,
    type: 'profile',
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

const AboutPage = () => {
  const page = getPage('about')

  return (
    <>
      <PageTitle title='About' description='👋 Hi there! I am Hong.' />
      <Mdx code={page.body.code} />
    </>
  )
}

export default AboutPage
