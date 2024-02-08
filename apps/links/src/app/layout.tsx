import { GeistSans } from 'geist/font/sans'
import type { Metadata, Viewport } from 'next'

import '@/styles/globals.css'
import Footer from '@/components/footer'
import site from '@/config/site'

import Analytics from './analytics'
import grid from './grid.svg'

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
    title: site.name,
    card: 'summary_large_image',
    site: '@tszhong0411',
    creator: '@tszhong0411'
  },
  keywords: site.keywords,
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
        url: 'https://honghong.me/images/projects/links/cover.png',
        width: 1200,
        height: 832,
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

const RootLayout = (props: RootLayoutProps) => {
  const { children } = props

  return (
    <html lang='en-US' className={GeistSans.variable}>
      <body className='relative bg-black font-sans text-white'>
        <div
          className='absolute inset-0 -z-20 max-h-[80vh]'
          style={{
            backgroundImage: `url(${grid.src})`
          }}
        />
        <div
          className='absolute inset-0 -z-10 max-h-[80vh]'
          style={{
            backgroundImage:
              'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)'
          }}
        />
        <div className='relative min-h-screen overflow-x-hidden'>
          <main className='relative mx-auto max-w-lg px-4'>{children}</main>
        </div>
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}

export default RootLayout
