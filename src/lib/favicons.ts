type Favicon = {
  rel: string
  href: string
  sizes?: string
  type?: string
}

export const favicons: Favicon[] = [
  {
    rel: 'icon',
    href: '/static/favicon/favicon.svg',
  },
  {
    rel: 'apple-touch-icon',
    sizes: '180x180',
    href: '/static/favicon/apple-touch-icon.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '16x16',
    href: '/static/favicon/favicon-16x16.png',
  },
  {
    rel: 'icon',
    type: 'image/png',
    sizes: '32x32',
    href: '/static/favicon/favicon-32x32.png',
  },
  {
    rel: 'manifest',
    href: '/static/favicon/site.webmanifest',
  },
]
