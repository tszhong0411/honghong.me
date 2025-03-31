import { expect, test } from '@playwright/test'
import { db, eq, posts } from '@tszhong0411/db'
import { redis, redisKeys } from '@tszhong0411/kv'

const resetViews = async () => {
  await db
    .update(posts)
    .set({
      views: 0
    })
    .where(eq(posts.slug, 'test'))

  await redis.del(redisKeys.postViews('test'))
  await redis.del(redisKeys.postViewCount)
}

test.describe('views', () => {
  test.beforeEach(async ({ page }) => {
    await resetViews()
    await page.goto('/blog/test')
  })

  test('should be able to view a post', async ({ page }) => {
    await expect(page.getByTestId('view-count')).toHaveAttribute('aria-label', '1')

    await resetViews()
  })
})
