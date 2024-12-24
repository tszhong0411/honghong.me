import { env } from '@tszhong0411/env'
import { drizzle } from 'drizzle-orm/node-postgres'

import * as schema from './schema'

export const db = drizzle({ connection: env.DATABASE_URL, schema })
