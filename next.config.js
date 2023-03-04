import { withContentlayer } from 'next-contentlayer'

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
    typedRoutes: true,
  },

  images: {
    domains: ['avatars.githubusercontent.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.googleusercontent.com',
      },
    ],
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

export default withContentlayer(nextConfig)
