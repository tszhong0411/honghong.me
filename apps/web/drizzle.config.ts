/**
 * Don't know why env.ts is not working
 */
import * as dotenv from 'dotenv'
import { type Config } from 'drizzle-kit'

dotenv.config({
  path: '../../.env.local'
})

export default {
  schema: './src/db/schema.ts',
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DATABASE_URL!
  },
  out: './src/db/migration'
} satisfies Config
