import { type Config } from 'drizzle-kit'

import { env } from '@/env'

export default {
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: env.DATABASE_URL
  },
  out: './src/db/migration'
} satisfies Config
