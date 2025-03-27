import fs from 'node:fs/promises'
import path from 'node:path'

import { test as teardown } from '@playwright/test'
import { db, eq, like, likesSessions, posts } from '@tszhong0411/db'

teardown('teardown blog', async () => {
  const testPostPath = path.join(process.cwd(), 'src/content/blog/en/test.mdx')
  await db.delete(posts).where(eq(posts.slug, 'test'))
  await db.delete(likesSessions).where(like(likesSessions.id, 'test___'))
  await fs.rm(testPostPath)
})
