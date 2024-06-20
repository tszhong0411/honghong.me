import bundleAnalyzer from '@next/bundle-analyzer'
import { NextConfigHeaders } from '@tszhong0411/shared'
import createJiti from 'jiti'
import { fileURLToPath } from 'node:url'

const jiti = createJiti(fileURLToPath(import.meta.url))

jiti('@tszhong0411/env')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true'
})

/** @type {import('next').NextConfig} */
const config = {
  experimental: {
    optimizePackageImports: ['shiki']
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
  }
}

export default withBundleAnalyzer(config)
