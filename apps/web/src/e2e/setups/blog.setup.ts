import fs from 'node:fs/promises'
import path from 'node:path'

import { test as setup } from '@playwright/test'
import { db, posts } from '@tszhong0411/db'

const TEST_POST = `\
---
title: Test Post
date: '2000-01-01T00:00:00Z'
modifiedTime: '2000-01-01T00:00:00Z'
summary: This is a test post.
---

# Test Post

This is a test post.
`

const testPostPath = path.join(process.cwd(), 'src/content/blog/en/test.mdx')

setup('setup blog', async () => {
  await db
    .insert(posts)
    .values({
      slug: 'test',
      views: 0
    })
    .onConflictDoNothing({ target: posts.slug })

  // Only works in dev mode since content-collections will build the test post
  // In CI, we have a GitHub Action to write the test post before building the apps
  await fs.writeFile(testPostPath, TEST_POST)
})
