import { flags } from '@tszhong0411/env'
import { getTranslations } from '@tszhong0411/i18n/server'
import type { Metadata, ResolvingMetadata } from 'next'
import type { WebPage, WithContext } from 'schema-dts'

import PageTitle from '@/components/page-title'
import { SITE_TITLE, SITE_URL } from '@/lib/constants'

import Items from './items'

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
  const t = await getTranslations({ locale, namespace: 'dashboard' })
  const title = t('title')
  const description = t('description')

  return {
    title,
    description,
    alternates: {
      canonical: '/dashboard'
    },
    openGraph: {
      ...previousOpenGraph,
      url: '/dashboard',
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
  const t = await getTranslations('dashboard')
  const title = t('title')
  const description = t('description')

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: `${SITE_URL}/dashboard`,
    isPartOf: {
      '@type': 'WebSite',
      name: SITE_TITLE,
      url: SITE_URL
    }
  }

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      {flags.stats ? <Items /> : null}
    </>
  )
}

export default Page
