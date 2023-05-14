import type { Metadata } from 'next'

import PageTitle from '@/components/PageTitle'

import { site } from '@/config/site'

import Items from './items'

export const dynamic = 'force-dynamic'

const title = 'Dashboard'
const description =
  'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.'

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: `${site.url}/dashboard`,
  },
  openGraph: {
    url: `${site.url}/dashboard`,
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

const DashboardPage = () => {
  return (
    <>
      <PageTitle
        title='Dashboard'
        description='This is my personal dashboard, built with Next.js API routes deployed as
        serverless functions. I use this dashboard to track various metrics
        across platforms like YouTube, GitHub, and more.'
      />
      <Items />
    </>
  )
}

export default DashboardPage
