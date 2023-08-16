import { allProjects } from 'contentlayer/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'
import Image from '@/components/mdx/image'

import { site } from '@/config/site'

import Header from './header'

type ProjectPageProps = {
  params: {
    slug: string
  }
}

export const generateStaticParams = async (): Promise<
  ProjectPageProps['params'][]
> => {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export const generateMetadata = async (
  props: ProjectPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const { params } = props

  const project = allProjects.find((project) => project.slug === params.slug)

  if (!project) {
    return {}
  }

  const previousTwitter = (await parent)?.twitter || {}

  return {
    title: project.name,
    description: project.description,
    alternates: {
      canonical: `${site.url}/projects/${params.slug}`,
    },
    openGraph: {
      url: `${site.url}/projects/${params.slug}`,
      type: 'website',
      title: project.name,
      siteName: site.name,
      description: project.description,
      locale: 'en-US',
      images: [
        {
          url: `${site.url}${project.image}`,
          width: 1200,
          height: 630,
          alt: project.description,
          type: 'image/png',
        },
      ],
    },
    twitter: {
      ...previousTwitter,
      title: project.name,
      description: project.description,
      images: [`${site.url}${project.image}`],
    },
  }
}

const ProjectPage = (props: ProjectPageProps) => {
  const { slug } = props.params

  const project = allProjects.find((project) => project.slug === slug)

  if (!project) {
    notFound()
  }

  const { name, image } = project

  return (
    <>
      <Header {...project} />
      <Image
        src={image}
        width={1200}
        height={630}
        alt={name}
        className='my-12 border border-accent-2'
        rounded='rounded-lg'
      />
      <Mdx code={project.body.code} />
    </>
  )
}

export default ProjectPage
