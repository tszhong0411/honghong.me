import { allPages } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'

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

const Page = () => {
  const page = allPages.find((p) => p.slug === 'about')

  if (!page) {
    return notFound()
  }

  const { body } = page

  return (
    <>
      <PageTitle title={title} description={description} />
      <Mdx content={body} />
    </>
  )
}

export default Page
