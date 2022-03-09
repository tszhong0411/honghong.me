import '@/css/global.css'
import '@/css/prism.css'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource/noto-sans-tc'
import '@fontsource/jetbrains-mono'
import '@fontsource/inter/variable-full.css'
import 'react-loading-skeleton/dist/skeleton.css'

import { ThemeProvider } from 'next-themes'
import Analytics from '@/components/analytics'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'

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
