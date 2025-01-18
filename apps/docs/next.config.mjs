import bundleAnalyzer from '@next/bundle-analyzer'
import { withMDX } from '@tszhong0411/mdx/next'
import { NextConfigHeaders } from '@tszhong0411/shared'

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const config = {
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

  async headers() {
    return NextConfigHeaders
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/introduction',
        permanent: true
      },
      {
        source: '/ui/components',
        destination: '/ui/components/accordion',
        permanent: true
      }
    ]
  }
}

export default withMDX(withBundleAnalyzer(config))
