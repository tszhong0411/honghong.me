import { cx } from '@tszhong0411/utils'
import { Analytics } from '@vercel/analytics/react'
import type { Metadata } from 'next'
import { Fira_Code, Inter, Noto_Sans_TC } from 'next/font/google'
import '@/styles/globals.css'

import Footer from '@/components/footer'
import Header from '@/components/header'
import Providers from '@/components/providers'
import Toaster from '@/components/toaster'

import { site } from '@/config/site'

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL('https://honghong.me'),
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`,
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/static/favicon/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    site: '@TszhongLai0411',
    siteId: '1152256803746377730',
    creator: '@TszhongLai0411',
    creatorId: '1152256803746377730',
    images: [`${site.url}/static/images/og/og.png`],
  },
  keywords: site.keywords,
  themeColor: [
    {
      media: '(prefers-color-scheme: light)',
      color: '#ffffff',
    },
    {
      media: '(prefers-color-scheme: dark)',
      color: '#000000',
    },
  ],
  creator: 'tszhong0411',
  openGraph: {
    url: `${site.url}`,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'en-US',
    images: [
      {
        url: `${site.url}/static/images/og/og.png`,
        width: 1200,
        height: 630,
        alt: site.description,
        type: 'image/png',
      },
    ],
  },
  icons: {
    icon: '/static/favicon/favicon.svg',
    shortcut: '/static/favicon/favicon.svg',
    apple: [
      {
        url: '/static/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
    other: [...site.favicons],
  },
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})

const firaCode = Fira_Code({
  variable: '--font-fira-code',
  subsets: ['latin'],
})

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html
      lang='en-US'
      className={cx(
        inter.variable,
        notoSansTC.variable,
        firaCode.variable,
        'scroll-smooth'
      )}
    >
      <body>
        <Providers>
          <Header />
          <main className='relative mx-auto mb-16 max-w-4xl px-8 py-24'>
            {children}
          </main>
          <Toaster />
          <Footer />
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
