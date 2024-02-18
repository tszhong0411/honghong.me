import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import Image from '@/components/mdx/image'
import { SITE_URL } from '@/lib/constants'
import { getAllPages, getPage, type ProjectMetadata } from '@/lib/mdx'

import Header from './header'

type ProjectPageProps = {
  params: {
    slug: string
  }
  searchParams: Record<string, never>
}

export const generateStaticParams = (): Array<ProjectPageProps['params']> => {
  return getAllPages<ProjectMetadata>('projects').map((project) => ({
    slug: project.slug
  }))
}

export const generateMetadata = async (
  props: ProjectPageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { params } = props

  const project = getPage<ProjectMetadata>(`projects/${params.slug}`)

  if (!project) {
    return {}
  }

  const {
    metadata: { name, description }
  } = project
  const previousTwitter = (await parent)?.twitter ?? {}
  const previousOpenGraph = (await parent)?.openGraph ?? {}

  return {
    title: name,
    description: description,
    alternates: {
      canonical: `${SITE_URL}/projects/${params.slug}`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${SITE_URL}/projects/${params.slug}`,
      title: name,
      description: description,
      images: [
        {
          url: `${SITE_URL}/images/projects/${params.slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: name,
      description: description,
      images: [
        {
          url: `${SITE_URL}/images/projects/${params.slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description
        }
      ]
    }
  }
}

const ProjectPage = (props: ProjectPageProps) => {
  const {
    params: { slug }
  } = props

  const project = getPage<ProjectMetadata>(`projects/${slug}`)

  if (!project) {
    notFound()
  }

  const { metadata, content } = project

  return (
    <div className='mx-auto max-w-3xl'>
      <Header metadata={metadata} />
      <Image
        src={`/images/projects/${slug}/cover.png`}
        width={1280}
        height={832}
        alt={metadata.name}
        className='my-12 rounded-lg'
        lazy={false}
      />
      <Mdx content={content} />
    </div>
  )
}

export default ProjectPage
