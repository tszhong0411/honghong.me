import fs from 'node:fs/promises'
import path from 'node:path'

import { consola } from 'consola'

import { db } from './db'
import { posts } from './schema'

const main = async () => {
  try {
    const files = await fs.readdir(path.join(process.cwd(), '../../apps/web/src/content/blog/en'))

    for (const file of files) {
      const slug = file.replace('.mdx', '')
      await db.insert(posts).values({ slug, views: 0 })
    }

    consola.success('Data inserted successfully!')

    // eslint-disable-next-line unicorn/no-process-exit -- required here to exit the process immediately
    process.exit(0)
  } catch (error) {
    consola.error('Error inserting data:\n', error)
  }
}

main()
