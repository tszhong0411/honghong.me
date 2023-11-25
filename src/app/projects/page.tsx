import { allProjects } from 'contentlayer/generated'
import type { Metadata, ResolvingMetadata } from 'next'

import PageTitle from '@/components/page-title'
import ProjectCard from '@/components/project-card'
import site from '@/config/site'

export const runtime = 'edge'
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
      canonical: `${site.url}/projects`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${site.url}/projects`,
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
  return (
    <>
      <PageTitle
        title='Projects'
        description='The list of my projects. Everything was made with ❤️.'
      />
      <div className='grid gap-4 md:grid-cols-2'>
        {allProjects.map((project) => (
          <ProjectCard key={project._id} {...project} />
        ))}
      </div>
    </>
  )
}

export default ProjectsPage
