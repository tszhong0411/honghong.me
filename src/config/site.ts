import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

import { isProduction } from '@/lib/constants'

type Site = {
  url: string
  logo: string
  title: string
  name: string
  titleTemplate: string
  description: string
  favicons: IconDescriptor[]
}

export const site: Site = {
  url: isProduction ? 'https://honghong.me' : 'http://localhost:3000',
  logo: 'https://honghong.me/static/images/avatar.png',
  title: '小康',
  name: '小康',
  titleTemplate: '- 小康',
  description: '小康 – 16 yrs • Student • Full-stack Web Development Student',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/static/favicon/favicon-16x16.png',
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/static/favicon/favicon-32x32.png',
    },
  ],
}
