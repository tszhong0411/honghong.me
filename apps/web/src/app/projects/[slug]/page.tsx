import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import Image from '@/components/mdx/image'
import site from '@/config/site'
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
    metadata: { name, description, image }
  } = project
  const previousTwitter = (await parent)?.twitter ?? {}

  return {
    title: name,
    description: description,
    alternates: {
      canonical: `${site.url}/projects/${params.slug}`
    },
    openGraph: {
      url: `${site.url}/projects/${params.slug}`,
      type: 'website',
      title: name,
      siteName: site.name,
      description: description,
      locale: 'en-US',
      images: [
        {
          url: `${site.url}${image}`,
          width: 1200,
          height: 630,
          alt: description,
          type: 'image/png'
        }
      ]
    },
    twitter: {
      ...previousTwitter,
      title: name,
      description: description,
      images: [`${site.url}${image}`]
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
        src={metadata.image}
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
