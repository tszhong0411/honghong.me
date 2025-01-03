import { getLocale, getTranslations } from '@tszhong0411/i18n/server'
import { allPages } from 'mdx/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import type { WebPage, WithContext } from 'schema-dts'

import Mdx from '@/components/mdx'
import PageTitle from '@/components/page-title'
import { SITE_URL } from '@/lib/constants'
import { getLocalizedPath } from '@/utils/get-localized-path'

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
  const t = await getTranslations({ locale, namespace: 'uses' })
  const title = t('title')
  const description = t('description')
  const url = getLocalizedPath({ slug: '/uses', locale })

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
  const title = t('uses.title')
  const description = t('uses.description')
  const url = `${SITE_URL}${getLocalizedPath({ slug: '/uses', locale })}`
  const page = allPages.find((p) => p.slug === 'uses' && p.language === locale)

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

  if (!page) {
    return notFound()
  }

  const { body } = page

  return (
    <>
      <script
        type='application/ld+json'
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <PageTitle title={title} description={description} />
      <Mdx content={body} />
    </>
  )
}

export default Page
