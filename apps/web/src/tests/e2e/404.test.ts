import { expect, test } from '@playwright/test'

test('404 page', async ({ page }) => {
  const res = await page.goto('/blog/not-found')

  expect(res?.status()).toBe(404)
})
