import { expect, test } from '@playwright/test'

test.describe('views', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test-view')
  })

  test('should be able to view a post', async ({ page }) => {
    await expect(page.getByTestId('view-count')).toHaveAttribute('aria-label', '1')
  })
})
