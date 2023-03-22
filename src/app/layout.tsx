import clsx from 'clsx'
import type { Metadata } from 'next'
import { Fira_Code, Inter, Noto_Sans_TC } from 'next/font/google'
import { ThemeProvider } from 'next-themes'

import '@/styles/globals.css'

import CustomToaster from '@/components/CustomToaster'
import KBar from '@/components/KBar'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

import { site } from '@/config/site'

import Analytics from '../components/Analytics'

import { WithChildren } from '@/types'

type RootLayoutProps = WithChildren

export const metadata: Metadata = {
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`,
  },
  description: site.description,
  robots: {
    index: true,
    follow: true,
  },
  manifest: `${site.url}/static/favicon/site.webmanifest`,
  twitter: {
    title: site.name,
    card: 'summary_large_image',
    site: '@TszhongLai0411',
    creator: '@TszhongLai0411',
  },
  openGraph: {
    url: `${site.url}`,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'zh-TW',
    images: [
      {
        url: `${site.url}/static/images/og/og.png`,
        width: 1200,
        height: 630,
        alt: site.description,
      },
    ],
  },
  icons: {
    icon: '/static/favicon/favicon.svg',
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
      lang='en'
      className={clsx(
        inter.variable,
        notoSansTC.variable,
        firaCode.variable,
        'scroll-smooth'
      )}
    >
      <body className='overflow-x-hidden bg-hong-bg font-default'>
        <ThemeProvider attribute='class' defaultTheme='dark'>
          <KBar>
            <Header />
            <main className='relative mx-auto mb-16 max-w-4xl px-8 py-24'>
              {children}
            </main>
            <CustomToaster />
            <Footer />
          </KBar>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
