const { withContentlayer } = require('next-contentlayer')

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextTranslate = require('next-translate')

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = withContentlayer()(
  nextTranslate(
    withBundleAnalyzer({
      swcMinify: true,
      reactStrictMode: true,
      images: {
        domains: ['cdn.jsdelivr.net', 'avatars.githubusercontent.com'],
      },
      pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
      eslint: {
        dirs: ['pages', 'components', 'lib', 'layouts', 'scripts'],
      },
      webpack: (config, { dev, isServer }) => {
        if (!dev && !isServer) {
          // Replace React with Preact only in client production build
          Object.assign(config.resolve.alias, {
            'react/jsx-runtime.js': 'preact/compat/jsx-runtime',
            react: 'preact/compat',
            'react-dom/test-utils': 'preact/test-utils',
            'react-dom': 'preact/compat',
          })
        }

        return config
      },
    })
  )
)
