import { cn } from '@tszhong0411/utils'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Image from 'next/image'

import '@/styles/globals.css'
import Analytics from '@/components/analytics'
import { AutoRefresh } from '@/components/auto-refresh'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Hello from '@/components/hello'
import SignInModal from '@/components/sign-in-modal'
import {
  flags,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL
} from '@/lib/constants'

import Providers from './providers'

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_TITLE,
    template: `%s | ${SITE_TITLE}`
  },
  description: SITE_DESCRIPTION,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  manifest: '/favicon/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    site: '@tszhong0411',
    siteId: '1152256803746377730',
    creator: '@tszhong0411',
    creatorId: '1152256803746377730',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION
      }
    ]
  },
  keywords: ['tszhong0411', 'Next.js', 'React', 'TypeScript', 'Node.js'],
  creator: 'tszhong0411',
  openGraph: {
    url: SITE_URL,
    type: 'website',
    title: SITE_TITLE,
    siteName: SITE_TITLE,
    description: SITE_DESCRIPTION,
    locale: 'en-US',
    images: [
      {
        url: '/images/og.png',
        width: 1200,
        height: 630,
        alt: SITE_DESCRIPTION,
        type: 'image/png'
      }
    ]
  },
  icons: {
    icon: '/favicon/favicon.svg',
    shortcut: '/favicon/favicon.svg',
    apple: [
      {
        url: '/favicon/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png'
      }
    ],
    other: [
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '16x16',
        url: '/favicon/favicon-16x16.png'
      },
      {
        rel: 'icon',
        type: 'image/png',
        sizes: '32x32',
        url: '/favicon/favicon-32x32.png'
      }
    ]
  }
}

export const viewport: Viewport = {
  themeColor: {
    color: '#000000'
  }
}

const calcom = localFont({
  src: '../../public/fonts/CalSans-SemiBold.woff2',
  variable: '--font-title'
})

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <AutoRefresh>
      <html
        lang='en-US'
        className={cn(
          GeistSans.variable,
          GeistMono.variable,
          calcom.variable,
          'scroll-smooth'
        )}
      >
        <body>
          <Providers>
            <Hello />
            <Header />
            <main
              id='skip-nav'
              className='mx-auto mb-16 max-w-5xl px-5 py-24 sm:px-8'
            >
              {children}
            </main>

            <Footer />
            {flags.analytics && <Analytics />}
            <SignInModal />
            <Image
              width={1512}
              height={550}
              className='absolute left-1/2 top-0 -z-10 -translate-x-1/2'
              src='/images/gradient-background-top.png'
              alt=''
              role='presentation'
              priority
            />
            <Image
              width={1512}
              height={447}
              className='absolute -bottom-6 left-1/2 -z-10 -translate-x-1/2'
              src='/images/gradient-background-bottom.png'
              alt=''
              role='presentation'
              priority
            />
          </Providers>
        </body>
      </html>
    </AutoRefresh>
  )
}

export default RootLayout
