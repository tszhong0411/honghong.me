import { expect, test } from '@playwright/test'
import { redis, redisKeys } from '@tszhong0411/kv'

import { getSessionId } from '@/utils/get-session-id'

test.describe('like button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test')
  })

  test('should be able to like a post', async ({ page }) => {
    await expect(page.getByTestId('like-count')).toHaveAttribute('aria-label', '0')

    await page.getByTestId('like-button').click()
    await expect(page.getByTestId('like-count')).toHaveAttribute('aria-label', '1')

    await page.getByTestId('like-button').click()
    await page.getByTestId('like-button').click()
    await expect(page.getByTestId('like-count')).toHaveAttribute('aria-label', '3')

    // Remove the like
    await redis.del(redisKeys.postLikes('test'))
    await redis.del(redisKeys.postLikeCount)
    await redis.del(redisKeys.currentUserLikes('test', getSessionId('test', '::1')))
  })
})
