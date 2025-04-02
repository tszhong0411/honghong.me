import fs from 'node:fs/promises'
import path from 'node:path'

import { test as setup } from '@playwright/test'
import { db, posts } from '@tszhong0411/db'

import { TEST_POSTS } from '../constants'

const createTestPost = (title: string) => `\
---
title: ${title}
date: '2000-01-01T00:00:00Z'
modifiedTime: '2000-01-01T00:00:00Z'
summary: This is a test post.
---

# ${title}

This is a test post.
`

setup('setup blog', async () => {
  for (const post of TEST_POSTS) {
    await db
      .insert(posts)
      .values({
        slug: post.slug,
        views: 0,
        likes: 0
      })
      .onConflictDoNothing({ target: posts.slug })

    // Only works in dev mode since content-collections will build the test post
    // In CI, we have a GitHub Action to write the test post before building the apps
    const testPostPath = path.join(process.cwd(), `src/content/blog/en/${post.slug}.mdx`)
    await fs.writeFile(testPostPath, createTestPost(post.title))
  }
})
