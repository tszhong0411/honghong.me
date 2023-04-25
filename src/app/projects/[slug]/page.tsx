import { IconHome } from '@tabler/icons-react'
import { IconBrandGithub } from '@tabler/icons-react'
import { allProjects } from 'contentlayer/generated'
import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import getIconByName from '@/lib/get-icon-by-name'

import MDXComponents from '@/components/MDXComponents'
import Image from '@/components/MDXComponents/Image'

import { site } from '@/config/site'

type ProjectPageProps = {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

export const generateMetadata = (props: ProjectPageProps): Metadata => {
  const { params } = props

  const project = allProjects.find((project) => project.slug === params.slug)

  if (!project) {
    return {}
  }

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
  }
}

const ProjectPage = (props: ProjectPageProps) => {
  const { slug } = props.params

  const project = allProjects.find((project) => project.slug === slug)

  if (!project) {
    notFound()
  }

  const MDXComponent = useMDXComponent(project.body.code)

  const { name, description, icon, homepage, github, repo, image } = project

  const Icon = getIconByName(icon)

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <Icon size={40} />
          <div className='flex flex-col'>
            <div className='text-2xl font-bold'>{name}</div>
            <div>{description}</div>
          </div>
        </div>
        <div className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'>
          {homepage && (
            <a
              target='_blank'
              rel='noopener noreferrer'
              href={homepage}
              className='animated flex items-center'
            >
              <IconHome size={20} className='mr-2 inline-block' />
              {homepage}
            </a>
          )}
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={github}
            className='animated flex items-center'
          >
            <IconBrandGithub size={20} className='mr-2 inline-block' />
            Tszhong0411/{repo}
          </a>
        </div>
      </div>
      <Image
        src={image}
        width={1200}
        height={630}
        alt={name}
        className='my-12 border border-accent-2'
        rounded='rounded-lg'
      />
      <div className='prose prose-invert w-full max-w-none'>
        <MDXComponent
          components={{
            ...MDXComponents,
          }}
        />
      </div>
    </>
  )
}

export default ProjectPage
