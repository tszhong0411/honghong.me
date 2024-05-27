import { env } from '@tszhong0411/env'
// import { drizzle } from 'drizzle-orm/node-postgres'
import { Client } from 'pg'

// import * as schema from './schema'

const client = new Client({
  connectionString: env.DATABASE_URL
})

client.connect()

// const db = drizzle(client, {
//   schema
// })

const main = () => {
  try {
    // console.log('🎉 Data inserted successfully!')
    console.log('Nothing to do')
  } catch (error) {
    console.error('❌ Error inserting data:\n', error)
  } finally {
    client.end()
  }
}

main()
