import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import path from 'node:path'
import pg from 'pg'

import { env } from '@/env'

import * as schema from './schema'

// When running seed.ts, I got an error:
// SyntaxError: The requested module 'pg' does not provide an export named 'Client'
// eslint-disable-next-line import/no-named-as-default-member
const client = new pg.Client({
  connectionString: env.DATABASE_URL
})

client.connect()

const db = drizzle(client, {
  schema
})

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'src/db/migrations')
    })
    console.log('🎉 Database migration successfully!')
  } catch (error) {
    console.error('❌ Database migration failed:\n', error)
  } finally {
    client.end()
  }
}

main()
