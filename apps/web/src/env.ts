import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

import { flags } from './lib/constants'

export const env = createEnv({
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
          NEXTAUTH_SECRET: z.string().min(1),
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

    DATABASE_URL: z.string().url()
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
  runtimeEnv: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,

    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,

    GITHUB_TOKEN: process.env.GITHUB_TOKEN,

    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,

    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
    GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,

    DATABASE_URL: process.env.DATABASE_URL,

    IP_ADDRESS_SALT: process.env.IP_ADDRESS_SALT,

    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,

    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    AUTHOR_EMAIL: process.env.AUTHOR_EMAIL,

    NEXT_PUBLIC_FLAG_COMMENT: process.env.NEXT_PUBLIC_FLAG_COMMENT,
    NEXT_PUBLIC_FLAG_AUTH: process.env.NEXT_PUBLIC_FLAG_AUTH,
    NEXT_PUBLIC_FLAG_STATS: process.env.NEXT_PUBLIC_FLAG_STATS,
    NEXT_PUBLIC_FLAG_SPOTIFY: process.env.NEXT_PUBLIC_FLAG_SPOTIFY,
    NEXT_PUBLIC_FLAG_ANALYTICS: process.env.NEXT_PUBLIC_FLAG_ANALYTICS,
    NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION:
      process.env.NEXT_PUBLIC_FLAG_GUESTBOOK_NOTIFICATION,
    NEXT_PUBLIC_FLAG_LIKE_BUTTON: process.env.NEXT_PUBLIC_FLAG_LIKE_BUTTON
  },

  emptyStringAsUndefined: true
})
