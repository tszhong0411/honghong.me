import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'
import { getPage, type PageMetadata } from '@/lib/mdx'

const title = 'About'
const description = 'A student who loves web development.'

type AboutPageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

export const generateMetadata = async (
  _: AboutPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent)?.openGraph ?? {}
  const previousTwitter = (await parent)?.twitter ?? {}

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

const AboutPage = () => {
  const page = getPage<PageMetadata>('pages/about')

  if (!page) {
    return notFound()
  }

  const { content } = page

  return (
    <>
      <PageTitle title='About' description='👋 Hi there! I am Hong.' />
      <Mdx content={content} />
    </>
  )
}

export default AboutPage
