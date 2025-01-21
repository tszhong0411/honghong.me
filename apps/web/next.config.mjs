import { fileURLToPath } from 'node:url'

import bundleAnalyzer from '@next/bundle-analyzer'
import { withMDX } from '@tszhong0411/mdx/next'
import { NextConfigHeaders } from '@tszhong0411/shared'
import { createJiti } from 'jiti'
import createNextIntlPlugin from 'next-intl/plugin'
import ReactComponentName from 'react-scan/react-component-name/webpack'

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti.import('@tszhong0411/env')

const withNextIntl = createNextIntlPlugin()

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    optimizePackageImports: ['shiki']
  },

  devIndicators: {
    appIsrStatus: process.env.NODE_ENV !== 'test',
    buildActivity: process.env.NODE_ENV !== 'test'
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

  async headers() {
    return NextConfigHeaders
  },

  webpack: (c) => {
    if (process.env.REACT_SCAN_MONITOR_API_KEY) {
      c.plugins.push(ReactComponentName({}))
    }

    return c
  }
}

export default withMDX(withNextIntl(withBundleAnalyzer(config)))
