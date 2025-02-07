import fs from 'node:fs/promises'
import path from 'node:path'

import { db } from './db'
import { posts } from './schema'

const main = async () => {
  try {
    const files = await fs.readdir(path.join(process.cwd(), '../../apps/web/src/content/blog/en'))

    for (const file of files) {
      const slug = file.replace('.mdx', '')
      await db.insert(posts).values({ slug, views: 0 })
    }

    console.log('🎉 Data inserted successfully!')

    // eslint-disable-next-line unicorn/no-process-exit -- required here
    process.exit(0)
  } catch (error) {
    console.error('❌ Error inserting data:\n', error)
  }
}

main()
