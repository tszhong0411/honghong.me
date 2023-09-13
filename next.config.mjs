import { withContentlayer } from 'next-contentlayer'

import './src/env.mjs'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: true
  },

  images: {
    domains: ['avatars.githubusercontent.com']
  },

  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error'
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return config
  },

  // eslint-disable-next-line @typescript-eslint/require-await
  async redirects() {
    return [
      {
        source: '/pc-specs',
        destination: '/uses',
        permanent: true
      }
    ]
  }
}

export default withContentlayer(nextConfig)
