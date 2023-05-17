import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  images: {
    domains: ['avatars.githubusercontent.com'],
  },

  webpack: (config) => {
    config.infrastructureLogging = {
      level: 'error',
    }

    return config
  },

  async redirects() {
    return [
      {
        source: '/pc-specs',
        destination: '/uses',
        permanent: true,
      },
    ]
  },
}

export default withContentlayer(nextConfig)
