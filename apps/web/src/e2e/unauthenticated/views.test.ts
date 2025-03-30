import { expect, test } from '@playwright/test'

test.describe('views', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test')
  })

  test('should be able to view a post', async ({ page }) => {
    // Loading state
    await expect(page.getByTestId('views-count')).toContainText('--')

    // Before the first view
    await expect(page.getByTestId('views-count')).toContainText('0')

    // After the first view
    await expect(page.getByTestId('views-count')).toContainText('1')
  })
})
