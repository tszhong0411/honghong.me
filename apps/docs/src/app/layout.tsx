import { Toaster } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'

import '@/styles/globals.css'
import Header from '@/components/layout/header'
import Sidebar from '@/components/layout/sidebar'

import Providers from './providers'

type LayoutProps = {
  children: React.ReactNode
}

const Layout = (props: LayoutProps) => {
  const { children } = props

  return (
    <html
      lang='en-US'
      className={cn(GeistSans.variable, GeistMono.variable, 'scroll-smooth')}
      suppressHydrationWarning
    >
      <body>
        <Providers>
          <Header />
          <div className='mx-auto max-w-6xl px-5 sm:px-8 md:grid md:grid-cols-[220px_minmax(0,1fr)] md:gap-6 lg:grid-cols-[240px_minmax(0,1fr)] lg:gap-10'>
            <Sidebar />
            <main className='pt-4'>{children}</main>
          </div>
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

export default Layout
