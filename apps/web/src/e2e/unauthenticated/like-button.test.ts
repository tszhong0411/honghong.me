import { expect, test } from '@playwright/test'

test.describe('like button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test')
  })

  test('should be able to like a post', async ({ page }) => {
    await expect(page.getByTestId('like-count')).toContainText('0')

    await page.getByTestId('like-button').click()
    await expect(page.getByTestId('like-count')).toContainText('1')

    await page.getByTestId('like-button').click()
    await page.getByTestId('like-button').click()
    await expect(page.getByTestId('like-count')).toContainText('3')
  })
})
