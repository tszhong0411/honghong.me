import { expect, test } from '@playwright/test'

import { getNumberFlow } from '../utils/number-flow'

test.describe('views', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test-view')
  })

  test('should be able to view a post', async ({ page }) => {
    const viewCount = page.getByTestId('view-count')

    // First ensure the view count element appears (may show 0 initially)
    await expect(viewCount).toBeVisible({ timeout: 10_000 })

    // Wait for the view tracking increment to complete and UI to update
    await expect(async () => {
      const count = await getNumberFlow(viewCount)
      expect(Number.parseInt(String(count))).toBeGreaterThan(0)
    }).toPass({ timeout: 20_000 })
  })
})
