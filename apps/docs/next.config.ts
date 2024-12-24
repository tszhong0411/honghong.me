import bundleAnalyzer from '@next/bundle-analyzer'
import { NextConfigHeaders } from '@tszhong0411/shared'
import type { NextConfig } from 'next'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

const config: NextConfig = {
  experimental: {
    optimizePackageImports: ['shiki']
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'honghong.me'
      }
    ]
  },

  transpilePackages: ['@tszhong0411/*'],

  // eslint-disable-next-line @typescript-eslint/require-await -- it must return a promise
  async headers() {
    return NextConfigHeaders
  },

  // eslint-disable-next-line @typescript-eslint/require-await -- it must return a promise
  async redirects() {
    return [
      {
        source: '/',
        destination: '/introduction',
        permanent: true
      }
    ]
  }
}

export default withBundleAnalyzer(config)
