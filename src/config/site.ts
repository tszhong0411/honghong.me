import { IconDescriptor } from 'next/dist/lib/metadata/types/metadata-types'

/**
 * Site configuration.
 */
type Site = {
  /**
   * The URL of the website.
   */
  url: string
  /**
   * The title of the website.
   */
  title: string
  /**
   * The name of the website.
   */
  name: string
  /**
   * The keywords of the website.
   */
  keywords: string[]
  /**
   * The title template of the website.
   * @see https://nextjs.org/docs/app/api-reference/functions/generate-metadata#template
   */
  titleTemplate: string
  /**
   * The description of the website.
   */
  description: string
  /**
   * The GitHub username of the website.
   */
  githubUsername: string
  /**
   * The favicons of the website.
   */
  favicons: IconDescriptor[]
}

const prodBaseURL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : 'https://honghong.me'

const devBaseURL = 'http://localhost:3000'

const site: Site = {
  url: process.env.NODE_ENV === 'production' ? prodBaseURL : devBaseURL,
  title: 'Hong',
  name: 'Hong',
  keywords: ['tszhong0411', 'Next.js', 'React', 'TypeScript', 'Node.js'],
  titleTemplate: '- Hong',
  description: 'Hong • 17 y/o • Student • Full-stack Developer',
  githubUsername: 'tszhong0411',
  favicons: [
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '16x16',
      url: '/favicon/favicon-16x16.png'
    },
    {
      rel: 'icon',
      type: 'image/png',
      sizes: '32x32',
      url: '/favicon/favicon-32x32.png'
    }
  ]
}

export default site
