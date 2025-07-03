import { env } from '@tszhong0411/env'
import { upstashCache } from 'drizzle-orm/cache/upstash'
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'

import * as schema from './schema'

const pool = new Pool({
  connectionString: env.DATABASE_URL
})

export const db = drizzle(pool, {
  schema,
  cache: upstashCache({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
    global: true,
    config: {
      ex: 60 * 60 * 24 // 1 day
    }
  })
})
