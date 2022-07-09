/* eslint-disable @typescript-eslint/no-var-requires */
const { withContentlayer } = require('next-contentlayer');

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextTranslate = require('next-translate');

/**
 * @type {import('next/dist/next-server/server/config').NextConfig}
 **/
module.exports = nextTranslate(
  withBundleAnalyzer(
    withContentlayer({
      eslint: {
        dirs: ['src'],
      },

      reactStrictMode: true,

      images: {
        domains: [
          'cdn.jsdelivr.net',
          'avatars.githubusercontent.com',
          'res.cloudinary.com',
          'cdnjs.cloudflare.com',
        ],
      },

      experimental: {
        images: {
          remotePatterns: [
            {
              protocol: 'https',
              hostname: '**.googleusercontent.com',
            },
          ],
        },
      },
      // SVGR
      webpack(config) {
        config.module.rules.push({
          test: /\.svg$/i,
          issuer: /\.[jt]sx?$/,
          use: [
            {
              loader: '@svgr/webpack',
              options: {
                typescript: true,
                icon: true,
              },
            },
          ],
        });

        return config;
      },

      async redirects() {
        return [
          {
            source: '/youtube',
            destination:
              'https://www.youtube.com/channel/UC2hMWOaOlk9vrkvFVaGmn0Q',
            permanent: false,
          },
        ];
      },
    })
  )
);
