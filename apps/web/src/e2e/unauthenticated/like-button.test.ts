import { expect, test } from '@playwright/test'

import { getNumberFlow } from '../utils/number-flow'

test.describe('like button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test-like')
  })

  test('should be able to like a post', async ({ page }) => {
    const likeCount = page.getByTestId('like-count')
    expect(await getNumberFlow(likeCount)).toBe('0')

    await page.getByTestId('like-button').click()
    expect(await getNumberFlow(likeCount)).toBe('1')

    await page.getByTestId('like-button').click()
    await page.getByTestId('like-button').click()
    expect(await getNumberFlow(likeCount)).toBe('3')
  })
})
