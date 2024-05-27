import { env } from '@tszhong0411/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/postgres-js/migrator'
import path from 'node:path'
import { Client } from 'pg'

import * as schema from './schema'

const client = new Client({
  connectionString: env.DATABASE_URL
})

client.connect()

const db = drizzle(client, {
  schema
})

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'src/migrations')
    })
    console.log('🎉 Database migration successfully!')
  } catch (error) {
    console.error('❌ Database migration failed:\n', error)
  } finally {
    client.end()
  }
}

main()
