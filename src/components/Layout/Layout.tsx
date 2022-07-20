import Head from 'next/head'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { Favicons } from '@/components/Layout/Favicons'
import { SeoProps } from '@/components/Layout/types'

export const defaultMeta = {
  title: '小康 – Developer, YouTuber',
  siteName: '小康 Blog',
  image: 'https://honghong.me/static/images/banner.png',
  type: 'website',
}

const Layout = (props: SeoProps) => {
  const { t } = useTranslation()
  const router = useRouter()
  const meta = {
    ...defaultMeta,
    ...props,
  }

  meta['title'] = props.templateTitle
    ? `${props.templateTitle}丨${meta.siteName}`
    : meta.title

  meta['description'] = props.description
    ? props.description
    : t('common:SEO_defaultDesc')

  return (
    <>
      <Head>
        <meta content='width=device-width, initial-scale=1' name='viewport' />
        <title>{meta.title}</title>
        <meta name='robots' content='follow, index' />
        <meta
          name='description'
          content={meta.summary ? meta.summary : meta.description}
        />
        <link
          rel='alternate'
          type='application/rss+xml'
          href={`/feed${
            router.locale !== router.defaultLocale ? `.${router.locale}` : ''
          }.xml`}
        />
        <meta
          property='og:url'
          content={`https://honghong.me${router.asPath}`}
        />
        <link rel='canonical' href={`https://honghong.me${router.asPath}`} />
        <meta property='og:type' content={meta.type} />
        <meta property='og:site_name' content='小康' />
        <meta
          property='og:description'
          content={meta.summary ? meta.summary : meta.description}
        />
        <meta property='og:title' content={meta.title} />
        {meta.date && (
          <meta property='article:published_time' content={meta.date} />
        )}
        {meta.lastmod && (
          <meta property='article:modified_time' content={meta.lastmod} />
        )}
        <meta property='og:image' content={`${meta.image}`} />
        <meta
          property='og:image:alt'
          content={meta.summary ? meta.summary : meta.description}
        />
        <meta property='og:image:type' content='image/png' />
        <meta property='og:image:width' content='1200' />
        <meta property='og:image:height' content='630' />
        <meta
          property='og:locale'
          content={router.locale.replace('-', '_')}
        ></meta>
        <meta name='twitter:image' content={`${meta.image}`} />
        <meta name='twitter:card' content='summary_large_image' />
        <meta name='twitter:site' content='@TszhongLai0411' />
        <meta name='twitter:title' content={meta.title} />
        <meta
          name='twitter:description'
          content={meta.summary ? meta.summary : meta.description}
        />
        <meta name='twitter:creator' content='@TszhongLai0411' />
        {meta.type === 'article' && (
          <script
            type='application/ld+json'
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(
                {
                  '@context': 'https://schema.org',
                  '@type': 'Article',
                  mainEntityOfPage: {
                    '@type': 'WebPage',
                    '@id': `https://honghong.me${router.asPath}`,
                  },
                  headline: meta.title,
                  image: {
                    '@type': 'ImageObject',
                    url: `https://honghong.me${meta.image}`,
                  },
                  datePublished: meta.date,
                  dateModified: meta.lastmod,
                  author: {
                    '@type': 'Person',
                    name: '小康',
                  },
                  publisher: {
                    '@type': 'Organization',
                    name: '小康',
                    logo: {
                      '@type': 'ImageObject',
                      url: `https://honghong.me/static/images/logo/logo-black.png`,
                    },
                  },
                  description: meta.summary,
                },
                null,
                2
              ),
            }}
          />
        )}
        <link
          rel='icon'
          type='image/x-icon'
          href='/static/favicon/favicon.ico'
        />
        {Favicons.map((linkProps) => (
          <link key={linkProps.href} {...linkProps} />
        ))}
        <meta name='msapplication-TileColor' content='#ffffff' />
        <meta
          name='msapplication-TileImage'
          content='/static/static/favicon/ms-icon-144x144.png'
        />
        <meta name='theme-color' content='#ffffff' />
      </Head>
      {props.children}
    </>
  )
}

export default Layout
