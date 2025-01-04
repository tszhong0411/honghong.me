import bundleAnalyzer from '@next/bundle-analyzer'
import { withI18n } from '@tszhong0411/i18n/plugin'
import { NextConfigHeaders } from '@tszhong0411/shared'
import type { NextConfig } from 'next'
import ReactComponentName from 'react-scan/react-component-name/webpack'

import '@tszhong0411/env'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const config: NextConfig = {
  experimental: {
    optimizePackageImports: ['shiki']
  },

  devIndicators: {
    appIsrStatus: process.env.NODE_ENV !== 'test',
    buildActivity: process.env.NODE_ENV !== 'test'
  },

  webpack: (c) => {
    c.plugins.push(ReactComponentName({}))
    return config
  },

  eslint: {
    ignoreDuringBuilds: !!process.env.CI
  },
  typescript: {
    ignoreBuildErrors: !!process.env.CI
  },

  transpilePackages: ['@tszhong0411/*'],

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com'
      },
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com'
      }
    ]
  },

  // eslint-disable-next-line @typescript-eslint/require-await -- it must return a promise
  async redirects() {
    return [
      {
        source: '/pc-specs',
        destination: '/uses',
        permanent: true
      },
      {
        source: '/atom',
        destination: '/rss.xml',
        permanent: true
      },
      {
        source: '/feed',
        destination: '/rss.xml',
        permanent: true
      },
      {
        source: '/rss',
        destination: '/rss.xml',
        permanent: true
      }
    ]
  },

  // eslint-disable-next-line @typescript-eslint/require-await -- it must return a promise
  async headers() {
    return NextConfigHeaders
  }
}

export default withI18n('./i18n.config.ts', withBundleAnalyzer(config))
