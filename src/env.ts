import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

/* c8 ignore start */
export const env = createEnv({
  skipValidation: process.env.CI === 'true' || process.env.NODE_ENV === 'test',
  server: {
    SPOTIFY_CLIENT_ID: z.string().min(1),
    SPOTIFY_CLIENT_SECRET: z.string().min(1),
    SPOTIFY_REFRESH_TOKEN: z.string().min(1),

    NEXTAUTH_SECRET: z.string().min(1),
    NEXTAUTH_URL: z.string().min(1),

    NODE_ENV: z
      .enum(['development', 'test', 'production'])
      .default('development'),

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

    UMAMI_DATABASE_URL: z.string().url()
  },
  client: {
    NEXT_PUBLIC_GISCUS_REPO: z.string().min(1),
    NEXT_PUBLIC_GISCUS_REPOSITORY_ID: z.string().min(1),
    NEXT_PUBLIC_GISCUS_CATEGORY: z.string().min(1),
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: z.string().min(1),

    NEXT_PUBLIC_UMAMI_URL: z.string().url(),
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: z.string().uuid(),
    NEXT_PUBLIC_UMAMI_WEBSITE_SHARE_URL: z.string().url()
  },
  runtimeEnv: {
    NEXT_PUBLIC_GISCUS_REPO: process.env.NEXT_PUBLIC_GISCUS_REPO,
    NEXT_PUBLIC_GISCUS_REPOSITORY_ID:
      process.env.NEXT_PUBLIC_GISCUS_REPOSITORY_ID,
    NEXT_PUBLIC_GISCUS_CATEGORY: process.env.NEXT_PUBLIC_GISCUS_CATEGORY,
    NEXT_PUBLIC_GISCUS_CATEGORY_ID: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID,

    SPOTIFY_CLIENT_ID: process.env.SPOTIFY_CLIENT_ID,
    SPOTIFY_CLIENT_SECRET: process.env.SPOTIFY_CLIENT_SECRET,
    SPOTIFY_REFRESH_TOKEN: process.env.SPOTIFY_REFRESH_TOKEN,

    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,

    NODE_ENV: process.env.NODE_ENV,

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

    UMAMI_DATABASE_URL: process.env.UMAMI_DATABASE_URL,
    NEXT_PUBLIC_UMAMI_URL: process.env.NEXT_PUBLIC_UMAMI_URL,
    NEXT_PUBLIC_UMAMI_WEBSITE_ID: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID,
    NEXT_PUBLIC_UMAMI_WEBSITE_SHARE_URL:
      process.env.NEXT_PUBLIC_UMAMI_WEBSITE_SHARE_URL
  },

  emptyStringAsUndefined: true
})
/* c8 ignore stop */
