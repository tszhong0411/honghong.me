const VERCEL_URL = process.env.NEXT_PUBLIC_VERCEL_URL
  ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
  : ''

export const WEBAPP_URL = VERCEL_URL || 'http://localhost:3000'

export const GITHUB_USERNAME = 'tszhong0411'

export const SITE_NAME = 'Hong'
export const SITE_TITLE = 'Hong - A Full Stack Developer'
export const SITE_DESCRIPTION = 'Hong • 17 y/o • Student • Full Stack Developer'
