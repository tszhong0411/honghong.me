import { createEnv } from '@t3-oss/env-nextjs'
import { vercel } from '@t3-oss/env-nextjs/presets'
import { z } from 'zod'

export const flags = {
  comment: process.env.NEXT_PUBLIC_FLAG_COMMENT === 'true',
  auth: process.env.NEXT_PUBLIC_FLAG_AUTH === 'true',
  stats: process.env.NEXT_PUBLIC_FLAG_STATS === 'true',
  spotify: process.env.NEXT_PUBLIC_FLAG_SPOTIFY === 'true',
  analytics: process.env.NEXT_PUBLIC_FLAG_ANALYTICS === 'true',
  guestbookNotification: process.env.NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION === 'true',
  likeButton: process.env.NEXT_PUBLIC_FLAG_LIKE_BUTTON === 'true'
}

export const env = createEnv({
  skipValidation: !!process.env.CI,
  extends: [vercel()],

  shared: {
    NODE_ENV: z.enum(['development', 'production', 'test']).default('development')
  },

  server: {
    ...(flags.spotify
      ? {
          SPOTIFY_CLIENT_ID: z.string().min(1),
          SPOTIFY_CLIENT_SECRET: z.string().min(1),
          SPOTIFY_REFRESH_TOKEN: z.string().min(1)
        }
      : {}),

    ...(flags.auth
      ? {
          AUTH_SECRET: z.string().min(1),
          GOOGLE_CLIENT_ID: z.string().min(1),
          GOOGLE_CLIENT_SECRET: z.string().min(1),
          GITHUB_CLIENT_ID: z.string().min(1),
          GITHUB_CLIENT_SECRET: z.string().min(1)
        }
      : {}),

    ...(flags.stats
      ? {
          GOOGLE_API_KEY: z.string().min(1),
          GITHUB_TOKEN: z.string().min(1),
          WAKATIME_API_KEY: z.string().min(1)
        }
      : {}),

    ...(flags.comment
      ? { RESEND_API_KEY: z.string().min(1), AUTHOR_EMAIL: z.string().email() }
      : {}),

    ...(flags.guestbookNotification
      ? {
          DISCORD_WEBHOOK_URL: z.string().url()
        }
      : {}),

    ...(flags.likeButton
      ? {
          IP_ADDRESS_SALT: z.string().min(1)
        }
      : {}),

    DATABASE_URL: z.string().url(),
    DATABASE_AUTH_TOKEN: z.string().min(1),
    SENTRY_AUTH_TOKEN: z.string().optional(),
    UPSTASH_REDIS_REST_URL: z.string().url(),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1)
  },
  client: {
    ...(flags.analytics
      ? {
          NEXT_PUBLIC_UMAMI_URL: z.string().url(),
          NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().uuid()
        }
      : {}),

    NEXT_PUBLIC_FLAG_COMMENT: z.string().min(1).optional(),
    NEXT_PUBLIC_FLAG_AUTH: z.string().min(1).optional(),
    NEXT_PUBLIC_FLAG_STATS: z.string().min(1).optional(),
    NEXT_PUBLIC_FLAG_SPOTIFY: z.string().min(1).optional(),
    NEXT_PUBLIC_FLAG_ANALYTICS: z.string().min(1).optional(),
    NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION: z.string().min(1).optional(),
    NEXT_PUBLIC_FLAG_LIKE_BUTTON: z.string().min(1).optional()
  },
  experimental__runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,

    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,

    NEXT_PUBLIC_FLAG_COMMENT: process.env.NEXT_PUBLIC_FLAG_COMMENT,
    NEXT_PUBLIC_FLAG_AUTH: process.env.NEXT_PUBLIC_FLAG_AUTH,
    NEXT_PUBLIC_FLAG_STATS: process.env.NEXT_PUBLIC_FLAG_STATS,
    NEXT_PUBLIC_FLAG_SPOTIFY: process.env.NEXT_PUBLIC_FLAG_SPOTIFY,
    NEXT_PUBLIC_FLAG_ANALYTICS: process.env.NEXT_PUBLIC_FLAG_ANALYTICS,
    NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION: process.env.NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION,
    NEXT_PUBLIC_FLAG_LIKE_BUTTON: process.env.NEXT_PUBLIC_FLAG_LIKE_BUTTON
  },

  emptyStringAsUndefined: true
})
