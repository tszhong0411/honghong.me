// import { createClient } from '@libsql/client/web'
// import { env } from '@tszhong0411/env'
// import { drizzle } from 'drizzle-orm/libsql'

const main = () => {
  try {
    // const db = drizzle(
    //   createClient({
    //     url: env.DATABASE_URL,
    //     authToken: env.DATABASE_AUTH_TOKEN
    //   })
    // )

    // console.log('🎉 Data inserted successfully!')
    console.log('Nothing to do')
  } catch (error) {
    console.error('❌ Error inserting data:\n', error)
  }
}

main()
