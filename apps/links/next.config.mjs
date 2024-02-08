/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'honghong.me'
      }
    ]
  }
}

export default nextConfig
