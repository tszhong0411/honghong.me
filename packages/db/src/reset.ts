import { consola } from 'consola'
import { sql } from 'drizzle-orm'
import { execa } from 'execa'

import { db } from './db'

const main = async () => {
  const confirmed = await consola.prompt('Are you sure you want to reset the database? (y/n)')
  if (confirmed !== 'y') {
    consola.info('Aborting...')

    return
  }

  consola.info('Resetting database...')

  try {
    consola.info('Dropping public schema...')

    await db.execute(sql`
      DROP SCHEMA public CASCADE;
    `)

    consola.info('Recreating public schema...')

    await db.execute(sql`
      CREATE SCHEMA public;
    `)

    consola.info('Granting privileges...')

    await db.execute(sql`
      GRANT ALL ON SCHEMA public TO "postgres";
      GRANT ALL ON SCHEMA public TO public;
    `)

    consola.info('Migrating database...')

    await execa('pnpm', ['db:push', '--force'], { stdio: 'inherit' })
    await execa('pnpm', ['db:migrate'], { stdio: 'inherit' })

    consola.info('Seeding database...')

    await execa('pnpm', ['db:seed'], { stdio: 'inherit' })

    consola.success('Database reset successfully!')

    // eslint-disable-next-line unicorn/no-process-exit -- required here to exit the process immediately
    process.exit(0)
  } catch (error) {
    consola.error('Error resetting database:', error)
  }
}

main()
