import { flags } from '@tszhong0411/env'
import type { Metadata, ResolvingMetadata } from 'next'

import PageTitle from '@/components/page-title'

import Items from './items'

const title = 'Dashboard'
const description =
  'This is my personal dashboard, built with Next.js API routes deployed as edge functions. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.'

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
      canonical: '/dashboard'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/dashboard',
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
  return (
    <>
      <PageTitle title={title} description={description} />
      {flags.stats ? <Items /> : null}
    </>
  )
}

export default Page
