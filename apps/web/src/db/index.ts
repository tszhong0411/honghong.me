import { Client } from '@planetscale/database'
import { drizzle } from 'drizzle-orm/planetscale-serverless'

import * as schema from './schema'

const client = new Client({
  url: process.env.DATABASE_URL as string
})

export const db = drizzle(client, {
  schema
})

export * from './adapter'
