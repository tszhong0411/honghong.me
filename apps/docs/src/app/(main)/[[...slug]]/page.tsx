import type { Metadata, ResolvingMetadata } from 'next'

import { allDocs } from 'content-collections'
import { notFound } from 'next/navigation'
import { Suspense } from 'react'

import Mdx from '@/components/mdx'

import DocsNavigation from './docs-navigation'
import EditOnGitHub from './edit-on-github'
import LinkBadges from './link-badges'

type PageProps = {
  params: Promise<{
    slug?: string[]
  }>
}

const getDoc = (params: Awaited<PageProps['params']>) => {
  const slug = params.slug?.join('/') ?? ''
  const doc = allDocs.find((d) => d.slug === slug)

  if (!doc) return null

  return doc
}

export const generateStaticParams = (): Array<{ slug: string[] }> => {
  return allDocs.map((doc) => ({
    slug: doc.slug.split('/')
  }))
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const params = await props.params

  const doc = getDoc(params)

  if (!doc) {
    return {}
  }

  const { title, description } = doc
  const previousTwitter = (await parent).twitter ?? {}
  const previousOpenGraph = (await parent).openGraph ?? {}
  const url = `/${doc.slug}`

  return {
    title: title,
    description: description,
    alternates: {
      canonical: url
    },
    openGraph: {
      ...previousOpenGraph,
      url,
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
  const params = await props.params

  const doc = getDoc(params)

  if (!doc) {
    notFound()
  }

  const { title, description, link, code, _meta } = doc

  const hasLinks = link?.doc !== undefined || link?.api !== undefined

  return (
    <div className='space-y-12'>
      <div className='space-y-4'>
        <h1 className='relative text-3xl font-semibold tracking-tight md:text-4xl'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
        {hasLinks && <LinkBadges {...link} />}
      </div>
      <Suspense>
        <Mdx className='my-12' code={code} />
      </Suspense>
      <EditOnGitHub filePath={_meta.filePath} />
      <DocsNavigation />
    </div>
  )
}

export default Page
