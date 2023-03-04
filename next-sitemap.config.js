/** @type {import('next-sitemap').IConfig} */
const config = {
  siteUrl:
    process.env.NODE_ENV === 'production'
      ? 'https://honghong.me'
      : 'http://localhost:3000',
  generateRobotsTxt: true,
  exclude: ['/api/*'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/404', '/500', '/api/*'],
      },
    ],
  },
}

export default config
