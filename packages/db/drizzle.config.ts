import type { Config } from 'drizzle-kit'

import { env } from '@tszhong0411/env'

export default {
  dialect: 'postgresql',
  schema: './src/schema/index.ts',
  dbCredentials: {
    url: env.DATABASE_URL
  },
  out: './src/migrations',
  strict: true,
  verbose: true
} satisfies Config
