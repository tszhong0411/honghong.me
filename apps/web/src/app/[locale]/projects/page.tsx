import { getLocale, getTranslations } from '@tszhong0411/i18n/server'
import { allProjects } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import type { CollectionPage, WithContext } from 'schema-dts'

import PageTitle from '@/components/page-title'
import ProjectCards from '@/components/project-cards'
import { SITE_TITLE, SITE_URL } from '@/lib/constants'

type PageProps = {
  params: Promise<{
    locale: string
  }>
  searchParams: Promise<Record<string, never>>
}

export const generateMetadata = async (
  props: PageProps,
  parent: ResolvingMetadata
): Promise<Metadata> => {
  const { locale } = await props.params
  const previousOpenGraph = (await parent).openGraph ?? {}
  const previousTwitter = (await parent).twitter ?? {}
  const t = await getTranslations({ locale, namespace: 'projects' })
  const title = t('title')
  const description = t('description')

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

const Page = async () => {
  const t = await getTranslations('projects')
  const title = t('title')
  const description = t('description')
  const locale = await getLocale()

  const projects = allProjects.filter((project) => project.language === locale)

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
