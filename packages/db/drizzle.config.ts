import { env } from '@tszhong0411/env'
import { type Config } from 'drizzle-kit'

export default {
  dialect: 'postgresql',
  schema: './src/schema.ts',
  dbCredentials: {
    url: env.DATABASE_URL
  },
  out: './src/migrations'
} satisfies Config
