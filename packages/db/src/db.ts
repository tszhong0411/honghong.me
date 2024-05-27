import { env } from '@tszhong0411/env'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

import * as schema from './schema'

const client = new Client({
  connectionString: env.DATABASE_URL
})

client.connect()

export const db = drizzle(client, {
  schema
})
