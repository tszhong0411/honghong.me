import fs from 'node:fs/promises'
import path from 'node:path'

import { test as teardown } from '@playwright/test'
import { comments, db, eq, guestbook, like, likesSessions, posts, users } from '@tszhong0411/db'
import { redis } from '@tszhong0411/kv'

import { TEST_POSTS, TEST_USER } from './constants'

teardown('teardown global', async () => {
  // Delete test user related data
  await db.delete(comments).where(like(comments.postId, 'test%'))
  await db.delete(guestbook).where(eq(guestbook.userId, TEST_USER.id))
  await db.delete(likesSessions).where(like(likesSessions.id, 'test___%'))
  await db.delete(posts).where(like(posts.slug, 'test%'))
  await db.delete(users).where(eq(users.id, TEST_USER.id))

  // Delete test blog posts
  for (const post of TEST_POSTS) {
    await fs.rm(path.join(process.cwd(), 'src/content/blog/en', `${post.slug}.mdx`))
  }

  // Clean cache
  await redis.flushall()
})
