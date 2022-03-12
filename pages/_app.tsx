import type { AppProps } from 'next/app'
import { SessionProvider } from 'next-auth/react'
import { ThemeProvider } from 'next-themes'

import '@/css/global.css'
import '@/css/prism.css'
import 'react-toastify/dist/ReactToastify.css'
import 'react-loading-skeleton/dist/skeleton.css'
import 'tippy.js/dist/tippy.css'

import Analytics from '@/components/analytics'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme={'system'}>
        <Analytics />
        <Component {...pageProps} />
      </ThemeProvider>
    </SessionProvider>
  )
}
