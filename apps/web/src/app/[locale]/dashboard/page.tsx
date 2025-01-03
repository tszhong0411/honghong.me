import { flags } from '@tszhong0411/env'
import { getLocale, getTranslations } from '@tszhong0411/i18n/server'
import type { Metadata, ResolvingMetadata } from 'next'
import type { WebPage, WithContext } from 'schema-dts'

import PageTitle from '@/components/page-title'
import { SITE_URL } from '@/lib/constants'
import { getLocalizedPath } from '@/utils/get-localized-path'

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
  const url = getLocalizedPath({ slug: '/dashboard', locale })

  return {
    title,
    description,
    alternates: {
      canonical: url
    },
    openGraph: {
      ...previousOpenGraph,
      url,
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
  const t = await getTranslations()
  const locale = await getLocale()
  const title = t('dashboard.title')
  const description = t('dashboard.description')
  const url = `${SITE_URL}${getLocalizedPath({ slug: '/dashboard', locale })}`

  const jsonLd: WithContext<WebPage> = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url,
    isPartOf: {
      '@type': 'WebSite',
      name: t('metadata.site-title'),
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
