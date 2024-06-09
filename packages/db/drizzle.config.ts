import { env } from '@tszhong0411/env'
import { type Config } from 'drizzle-kit'

export default {
  dialect: 'sqlite',
  driver: 'turso',
  schema: './src/schema/index.ts',
  dbCredentials: {
    url: env.DATABASE_URL,
    authToken: env.DATABASE_AUTH_TOKEN
  },
  out: './src/migrations',
  strict: true,
  verbose: true
} satisfies Config
