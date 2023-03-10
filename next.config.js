import { withSentryConfig } from '@sentry/nextjs'
import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },

  transpilePackages: ['@tabler/icons-react'],

  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
  },

  sentry: {
    autoInstrumentServerFunctions: true,
    hideSourceMaps: true,
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
        source: '/youtube',
        destination: 'https://youtube.com/@tszhong0411',
        permanent: false,
      },
    ]
  },
}

const sentryOptions = {
  silent: true,
}

export default withContentlayer(withSentryConfig(nextConfig, sentryOptions))
