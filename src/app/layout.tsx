import { Fira_Code, Inter, Noto_Sans_TC } from '@next/font/google'
import clsx from 'clsx'
import React from 'react'

import '@/styles/globals.css'

import { ThemeProvider } from '@/lib/next-themes'

import CustomToaster from '@/components/CustomToaster'
import KBar from '@/components/KBar'
import Footer from '@/components/Layout/Footer'
import Header from '@/components/Layout/Header'

import Analytics from '../components/Analytics'

import { WithChildren } from '@/types'

type RootLayoutProps = WithChildren

const inter = Inter({ variable: '--font-inter', subsets: ['latin'] })
const notoSansTC = Noto_Sans_TC({
  variable: '--font-noto-sans-tc',
  weight: ['400', '500', '700', '900'],
  subsets: ['latin'],
})
const firaCode = Fira_Code({ variable: '--font-fira-code', subsets: ['latin'] })

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
      <head />
      <body className='overflow-x-hidden bg-hong-bg font-default'>
        <ThemeProvider attribute='class'>
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
