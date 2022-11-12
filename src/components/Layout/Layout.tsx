import { Container } from '@mantine/core'
import { useRouter } from 'next/router'
import { NextSeo, NextSeoProps } from 'next-seo'
import useTranslation from 'next-translate/useTranslation'
import React from 'react'

import { MAX_WIDTH } from '@/lib/constants'

import { Favicons } from '@/components/Layout/Favicons'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

type LayoutProps = {
  children: React.ReactNode
} & Omit<NextSeoProps, 'children'>

const Layout = (props: LayoutProps) => {
  const { children, ...rest } = props
  const { t } = useTranslation('common')
  const { pathname } = useRouter()

  return (
    <>
      <NextSeo
        titleTemplate='%s | 小康 Blog'
        defaultTitle='小康 – Developer, YouTuber'
        description={t('Seo.defaultDesc')}
        canonical={`https://honghong.me${pathname}`}
        twitter={{
          cardType: 'summary_large_image',
          site: '@TszhongLai0411',
          handle: '@TszhongLai0411',
        }}
        openGraph={{
          url: `https://honghong.me${pathname}`,
          type: 'website',
          title: '小康 – Developer, YouTuber',
          description: t('Seo.defaultDesc'),
          images: [
            {
              url: 'https://honghong.me/static/images/og/og.png',
              width: 1200,
              height: 630,
              alt: t('Seo.defaultDesc'),
            },
          ],
        }}
        additionalLinkTags={[...Favicons]}
        {...rest}
      />
      <Header />
      <Container
        p={{
          base: '24px',
          sm: '48px 32px',
        }}
        size={MAX_WIDTH}
      >
        {children}
      </Container>
      <Footer />
    </>
  )
}

export default Layout
