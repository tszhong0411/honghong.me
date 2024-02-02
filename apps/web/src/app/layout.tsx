import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import Image from 'next/image'
import { Toaster } from 'sonner'

import '@/styles/globals.css'
import Analytics from '@/components/analytics'
import Footer from '@/components/footer'
import Header from '@/components/header'
import Hello from '@/components/hello'
import SignInModal from '@/components/sign-in-modal'
import site from '@/config/site'
import cn from '@/utils/cn'

import Providers from './providers'

type RootLayoutProps = {
  children: React.ReactNode
}

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: site.title,
    template: `%s ${site.titleTemplate}`
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
      'max-snippet': -1
    }
  },
  manifest: '/favicon/site.webmanifest',
  twitter: {
    card: 'summary_large_image',
    title: site.name,
    description: site.description,
    site: '@tszhong0411',
    siteId: '1152256803746377730',
    creator: '@tszhong0411',
    creatorId: '1152256803746377730',
    images: [`${site.url}/images/og.png`]
  },
  keywords: site.keywords,
  creator: 'tszhong0411',
  openGraph: {
    url: site.url,
    type: 'website',
    title: site.title,
    siteName: site.title,
    description: site.description,
    locale: 'en-US',
    images: [
      {
        url: `${site.url}/images/og.png`,
        width: 1200,
        height: 630,
        alt: site.description,
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
    other: [...site.favicons]
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
          <Analytics />
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
          <Toaster
            toastOptions={{
              classNames: {
                success: '[&>[data-icon]]:text-green-500',
                error: '[&>[data-icon]]:text-red-500',
                info: '[&>[data-icon]]:text-blue-500',
                warning: '[&>[data-icon]]:text-yellow-500'
              },
              duration: 2500
            }}
            visibleToasts={5}
            theme='dark'
            expand
          />
        </Providers>
      </body>
    </html>
  )
}

export default RootLayout
