/* eslint-disable @typescript-eslint/no-var-requires */
const nextTranslate = require('next-translate')

/** @type {import('next').NextConfig} */
module.exports = nextTranslate({
  reactStrictMode: true,

  images: {
    domains: [
      'cdn.jsdelivr.net',
      'avatars.githubusercontent.com',
      'res.cloudinary.com',
      'cdnjs.cloudflare.com',
    ],
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
        destination: 'https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q',
        permanent: false,
      },
    ]
  },
})
