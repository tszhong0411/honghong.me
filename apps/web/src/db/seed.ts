import * as dotenv from 'dotenv'
import { drizzle } from 'drizzle-orm/node-postgres'
import fs from 'node:fs'
import path from 'node:path'
import pg from 'pg'

import * as schema from './schema'

dotenv.config({
  path: '../../.env.local'
})

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is required')
}

// When running seed.ts, I got an error:
// SyntaxError: The requested module 'pg' does not provide an export named 'Client'
// eslint-disable-next-line import/no-named-as-default-member
const client = new pg.Client({
  connectionString: process.env.DATABASE_URL
})

client.connect()

const db = drizzle(client, {
  schema
})

const main = async () => {
  try {
    const data = []

    for (const post of fs.readdirSync(
      path.join(process.cwd(), 'src/content/blog')
    )) {
      data.push({
        createdAt: new Date(),
        slug: post.replace(/\.mdx$/, ''),
        likes: 0,
        views: 0
      })
    }

    await db.insert(schema.posts).values(data)
    console.log('🎉 Data inserted successfully!')
  } catch (error) {
    console.error('❌ Error inserting data:\n', error)
  } finally {
    client.end()
  }
}

main()
