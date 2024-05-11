import * as dotenv from 'dotenv'
import { type Config } from 'drizzle-kit'

dotenv.config({
  path: '../../.env.local'
})

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

export default {
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  dbCredentials: {
    url: process.env.DATABASE_URL
  },
  out: './src/db/migration'
} satisfies Config
