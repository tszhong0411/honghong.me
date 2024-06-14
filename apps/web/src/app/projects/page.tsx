import { allProjects } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'

import PageTitle from '@/components/page-title'
import ProjectCards from '@/components/project-cards'

const title = 'Projects'
const description = 'The list of my projects.'

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
      canonical: '/projects'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/projects',
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
  const projects = allProjects

  return (
    <>
      <PageTitle
        title='Projects'
        description='The list of my projects. Everything was made with ❤️.'
      />
      <ProjectCards projects={projects} />
    </>
  )
}

export default Page
