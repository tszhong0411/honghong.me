import type { Metadata, ResolvingMetadata } from 'next'

import PageTitle from '@/components/page-title'
import site from '@/config/site'

import Items from './items'

export const runtime = 'edge'
const title = 'Dashboard'
const description =
  'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.'

/**
 * The props of {@link DashboardPage}.
 */
type DashboardPageProps = {
  /**
   * The params of the URL.
   */
  params: Record<string, never>
  /**
   * The search params of the URL.
   */
  searchParams: Record<string, never>
}

export const generateMetadata = async (
  _: DashboardPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent)?.openGraph || {}
  const previousTwitter = (await parent)?.twitter || {}

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}/dashboard`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${site.url}/dashboard`,
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
