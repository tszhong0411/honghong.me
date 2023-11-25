import type { Metadata, ResolvingMetadata } from 'next'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'
import site from '@/config/site'
import getPage from '@/utils/get-page'

export const runtime = 'edge'
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
      canonical: `${site.url}/about`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${site.url}/about`,
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
  const page = getPage('about')

  return (
    <>
      <PageTitle title='About' description='👋 Hi there! I am Hong.' />
      <Mdx code={page.body.code} />
    </>
  )
}

export default AboutPage
