export const isProduction = process.env.NODE_ENV === 'production'

export const SITE_URL = isProduction
  ? 'https://honghong.me'
  : 'http://localhost:3000'

export const GITHUB_USERNAME = 'tszhong0411'

export const SITE_NAME = 'Hong'
export const SITE_TITLE = 'Hong - A Full Stack Developer'
export const SITE_DESCRIPTION = 'Hong • 18 y/o • Student • Full Stack Developer'

export const flags = {
  comment: isProduction || process.env.NEXT_PUBLIC_FLAG_COMMENT === 'true',
  auth: isProduction || process.env.NEXT_PUBLIC_FLAG_AUTH === 'true',
  stats: isProduction || process.env.NEXT_PUBLIC_FLAG_STATS === 'true',
  spotify: isProduction || process.env.NEXT_PUBLIC_FLAG_SPOTIFY === 'true',
  analytics: isProduction || process.env.NEXT_PUBLIC_FLAG_ANALYTICS === 'true',
  guestbookNotification:
    isProduction ||
    process.env.NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION === 'true',
  likeButton:
    isProduction || process.env.NEXT_PUBLIC_FLAG_LIKE_BUTTON === 'true'
}
