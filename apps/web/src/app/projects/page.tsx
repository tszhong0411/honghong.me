import type { Metadata, ResolvingMetadata } from 'next'

import PageTitle from '@/components/page-title'
import ProjectCards from '@/components/project-cards'
import { SITE_URL } from '@/lib/constants'
import { getAllPages, type ProjectMetadata } from '@/lib/mdx'

const title = 'Projects'
const description = 'The list of my projects.'

type ProjectsPageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

export const generateMetadata = async (
  _: ProjectsPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const previousOpenGraph = (await parent)?.openGraph ?? {}
  const previousTwitter = (await parent)?.twitter ?? {}

  return {
    title,
    description,
    alternates: {
      canonical: `${SITE_URL}/projects`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${SITE_URL}/projects`,
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

const ProjectsPage = () => {
  const projects = getAllPages<ProjectMetadata>('projects')

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

export default ProjectsPage
