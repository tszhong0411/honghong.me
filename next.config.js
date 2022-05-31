const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextTranslate = require('next-translate')

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = nextTranslate(
  withBundleAnalyzer(
    withContentlayer({
      swcMinify: true,
      reactStrictMode: true,
      images: {
        domains: ['cdn.jsdelivr.net', 'avatars.githubusercontent.com', 'res.cloudinary.com'],
      },
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      eslint: {
        dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
      },
    })
  )
)
