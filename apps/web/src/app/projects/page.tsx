import { allProjects } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import type { CollectionPage, WithContext } from 'schema-dts'

import PageTitle from '@/components/page-title'
import ProjectCards from '@/components/project-cards'
import { SITE_TITLE, SITE_URL } from '@/lib/constants'

const title = 'Projects'
const description = 'The list of my projects. Everything was made with ❤️.'

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

const jsonLd: WithContext<CollectionPage> = {
  '@context': 'https://schema.org',
  '@type': 'CollectionPage',
  name: title,
  description,
  url: `${SITE_URL}/projects`,
  isPartOf: {
    '@type': 'WebSite',
    name: SITE_TITLE,
    url: SITE_URL
  },
  hasPart: allProjects.map((project) => ({
    '@type': 'SoftwareApplication',
    name: project.name,
    description: project.description,
    url: `${SITE_URL}/projects/${project.slug}`,
    applicationCategory: 'WebApplication'
  }))
}

const Page = () => {
  const projects = allProjects

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <ProjectCards projects={projects} />
    </>
  )
}

export default Page
