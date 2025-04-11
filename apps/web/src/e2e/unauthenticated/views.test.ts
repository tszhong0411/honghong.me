import { expect, test } from '@playwright/test'

import { getNumberFlow } from '../utils/number-flow'

test.describe('views', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test-view')
  })

  test('should be able to view a post', async ({ page }) => {
    const viewCount = page.getByTestId('view-count')

    await expect(async () => {
      expect(await getNumberFlow(viewCount)).toBe('1')
    }).toPass({ timeout: 5000 })
  })
})
