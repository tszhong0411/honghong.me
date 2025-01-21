import type { Metadata, ResolvingMetadata } from 'next'

import { allDocs } from 'mdx/generated'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'

import LinkBadges from './link-badges'

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

const getDoc = (slug: string[] | undefined) => {
  return slug
    ? allDocs.find((d) => d.slugAsParams === slug.join('/'))
    : allDocs.find((d) => d.slugAsParams === 'introduction')
}

export const generateStaticParams = (): Array<{ slug: string[] }> => {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/')
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { slug } = await props.params

  const doc = getDoc(slug)

  if (!doc) {
    return {}
  }

  const { title, description } = doc
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}
  const normalizedSlug = slug ? slug.join('/') : ''

  return {
    title: title,
    description: description,
    alternates: {
      canonical: normalizedSlug
    },
    openGraph: {
      ...previousOpenGraph,
      url: normalizedSlug,
      title: title,
      description: description
    },
    twitter: {
      ...previousTwitter,
      title: title,
      description: description
    }
  }
}

const Page = async (props: PageProps) => {
  const { slug } = await props.params

  const doc = getDoc(slug)

  if (!doc) {
    notFound()
  }

  const { title, description, link, code } = doc

  const hasLinks = link?.doc !== undefined || link?.api !== undefined

  return (
    <div>
      <div className='space-y-4'>
        <h1 className='relative text-3xl font-extrabold tracking-tight md:text-4xl'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
        {hasLinks ? <LinkBadges {...link} /> : null}
      </div>
      <Mdx className='mt-8' code={code} />
    </div>
  )
}

export default Page
