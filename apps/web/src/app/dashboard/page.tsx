import type { Metadata, ResolvingMetadata } from 'next'

import PageTitle from '@/components/page-title'
import { SITE_URL } from '@/lib/constants'

import Items from './items'

const title = 'Dashboard'
const description =
  'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.'

type DashboardPageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

export const generateMetadata = async (
  _: DashboardPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent)?.openGraph ?? {}
  const previousTwitter = (await parent)?.twitter ?? {}

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/dashboard`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${SITE_URL}/dashboard`,
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
