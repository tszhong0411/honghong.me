import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
  skipValidation: process.env.CI === 'true',
  server: {
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),

    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),

    GOOGLE_API_KEY: z.string().min(1),
    GOOGLE_CLIENT_ID: z.string().min(1),
    GOOGLE_CLIENT_SECRET: z.string().min(1),

    OAUTH_CLIENT_KEY: z.string().min(1),
    OAUTH_CLIENT_SECRET: z.string().min(1),

    GITHUB_TOKEN: z.string().min(1),

    DATABASE_URL: z.string().url(),

    IP_ADDRESS_SALT: z.string().min(1),

    WAKATIME_API_KEY: z.string().min(1),

    DISCORD_WEBHOOK_URL: z.string().url(),

    RESEND_API_KEY: z.string().min(1),
    AUTHOR_EMAIL: z.string().email()
  },
  client: {
    NEXT_PUBLIC_UMAMI_URL: z.string().url(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().uuid()
  },
  runtimeEnv: {
    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,

    OAUTH_CLIENT_KEY: process.env.OAUTH_CLIENT_KEY,
    OAUTH_CLIENT_SECRET: process.env.OAUTH_CLIENT_SECRET,

    GITHUB_TOKEN: process.env.GITHUB_TOKEN,

    DATABASE_URL: process.env.DATABASE_URL,

    IP_ADDRESS_SALT: process.env.IP_ADDRESS_SALT,

    WAKATIME_API_KEY: process.env.WAKATIME_API_KEY,

    DISCORD_WEBHOOK_URL: process.env.DISCORD_WEBHOOK_URL,

    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,

    RESEND_API_KEY: process.env.RESEND_API_KEY,
    AUTHOR_EMAIL: process.env.AUTHOR_EMAIL
  },

  emptyStringAsUndefined: true
})
