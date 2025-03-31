import fs from 'node:fs/promises'
import path from 'node:path'

import { test as teardown } from '@playwright/test'
import { comments, db, eq, guestbook, like, likesSessions, posts, users } from '@tszhong0411/db'
import { redis } from '@tszhong0411/kv'

import { TEST_USER } from './constants'

const testPostPath = path.join(process.cwd(), 'src/content/blog/en/test.mdx')

teardown('teardown global', async () => {
  // Delete test user related data
  await db.delete(comments).where(eq(comments.postId, 'test'))
  await db.delete(guestbook).where(eq(guestbook.userId, TEST_USER.id))
  await db.delete(likesSessions).where(like(likesSessions.id, 'test___%'))
  await db.delete(posts).where(eq(posts.slug, 'test'))
  await db.delete(users).where(eq(users.id, TEST_USER.id))

  // Delete test blog post
  await fs.rm(testPostPath)

  // Clean cache
  await redis.flushall()
})
