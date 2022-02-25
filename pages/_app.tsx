import '@/css/global.css'
import '@/css/prism.css'
import 'katex/dist/katex.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/noto-sans-tc'
import '@fontsource/jetbrains-mono'
import '@fontsource/inter/variable-full.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { ThemeProvider } from 'next-themes'
import Head from 'next/head'
import { useEffect } from 'react'
import CdnList from '@/data/cdnList'
import siteMetadata from '@/data/siteMetadata'
import Analytics from '@/components/analytics'
import LayoutWrapper from '@/components/LayoutWrapper'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps: { session, ...pageProps } }: AppProps) {
  const { locale, defaultLocale } = useRouter()

  useEffect(() => {
    CdnList.css.map((item) => {
      const style = document.createElement('link')
      style.setAttribute('rel', 'stylesheet')
      style.setAttribute('href', item)
      document.querySelector('head').appendChild(style)
    })
    CdnList.javascript.map((item) => {
      const script = document.createElement('script')
      script.src = item
      document.querySelector('head').appendChild(script)
    })
  })
  return (
    <SessionProvider session={session}>
      <ThemeProvider attribute="class" defaultTheme={siteMetadata.theme}>
        <Head>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <link
            rel="alternate"
            type="application/rss+xml"
            href={`/feed${locale !== defaultLocale ? `.${locale}` : ''}.xml`}
          />
        </Head>
        <Analytics />
        <LayoutWrapper>
          <Component {...pageProps} />
        </LayoutWrapper>
      </ThemeProvider>
    </SessionProvider>
  )
}
