import { BlurImage } from '@tszhong0411/ui'
import { allProjects } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import type { SoftwareApplication, WithContext } from 'schema-dts'

import Mdx from '@/components/mdx'
import { SITE_NAME, SITE_URL } from '@/lib/constants'

import Header from './header'

type PageProps = {
  params: {
    slug: string
  }
  searchParams: Record<string, never>
}

export const generateStaticParams = (): Array<PageProps['params']> => {
  return allProjects.map((project) => ({
    slug: project.slug
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { params } = props

  const project = allProjects.find((p) => p.slug === params.slug)

  if (!project) {
    return {}
  }

  const { name, description } = project
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}

  return {
    title: name,
    description: description,
    alternates: {
      canonical: `/projects/${params.slug}`
    },
    openGraph: {
      ...previousOpenGraph,
      url: `/projects/${params.slug}`,
      title: name,
      description: description,
      images: [
        {
          url: `/images/projects/${params.slug}/cover.png`,
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
          url: `/images/projects/${params.slug}/cover.png`,
          width: 1280,
          height: 832,
          alt: description
        }
      ]
    }
  }
}

const Page = (props: PageProps) => {
  const {
    params: { slug }
  } = props

  const project = allProjects.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const { name, body, description, github } = project

  const jsonLd: WithContext<SoftwareApplication> = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name,
    description,
    url: `${SITE_URL}/projects/${slug}`,
    applicationCategory: 'WebApplication',
    author: {
      '@type': 'Person',
      name: SITE_NAME,
      url: SITE_URL
    },
    sameAs: [github],
    screenshot: `${SITE_URL}/images/projects/${slug}/cover.png`
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className='mx-auto max-w-3xl'>
        <Header {...project} />
        <BlurImage
          src={`/images/projects/${slug}/cover.png`}
          width={1280}
          height={832}
          alt={name}
          className='my-12 rounded-lg'
          lazy={false}
        />
        <Mdx content={body} />
      </div>
    </>
  )
}

export default Page
