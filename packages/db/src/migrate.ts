import { env } from '@tszhong0411/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { migrate } from 'drizzle-orm/node-postgres/migrator'
import path from 'node:path'
import pg from 'pg'

import * as schema from './schema'

const client = new pg.Client({
  connectionString: env.DATABASE_URL
})

client.connect()

const main = async () => {
  try {
    const db = drizzle(client, {
      schema
    })

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

await main()
