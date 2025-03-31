import { expect, test } from '@playwright/test'
import { redis, redisKeys } from '@tszhong0411/kv'

const removeViewsCache = async () => {
  await redis.del(redisKeys.postViews('test'))
  await redis.del(redisKeys.postViewCount)
}

test.describe('views', () => {
  test.beforeEach(async ({ page }) => {
    await removeViewsCache()
    await page.goto('/blog/test')
  })

  test('should be able to view a post', async ({ page }) => {
    await expect(page.getByTestId('view-count')).toHaveAttribute('aria-label', '1')

    await removeViewsCache()
  })
})
