import { createClient } from '@libsql/client/web'
import { env } from '@tszhong0411/env'
import { drizzle } from 'drizzle-orm/libsql'
import { migrate } from 'drizzle-orm/libsql/migrator'
import path from 'node:path'

const main = async () => {
  try {
    const db = drizzle(
      createClient({
        url: env.DATABASE_URL,
        authToken: env.DATABASE_AUTH_TOKEN
      })
    )

    await migrate(db, {
      migrationsFolder: path.join(process.cwd(), 'src/migrations')
    })
    console.log('🎉 Database migration successfully!')
  } catch (error) {
    console.error('❌ Database migration failed:\n', error)
  }
}

await main()
