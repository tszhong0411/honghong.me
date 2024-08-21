import { createId } from '@paralleldrive/cuid2'
import test, { expect } from '@playwright/test'
import { db, guestbook } from '@tszhong0411/db'

import { TEST_USER } from '../constants'

test.describe('guestbook page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guestbook')
  })

  test('should be able to submit a message', async ({ page }) => {
    const message = createId()

    await page.waitForResponse(
      (res) => res.url().includes('/api/trpc/guestbook.getInfiniteMessages') && res.status() === 200
    )

    await page.getByPlaceholder('Leave a message').fill(message)
    await page.getByRole('button', { name: 'Submit' }).click()

    await page.waitForResponse(
      (res) => res.url().includes('/api/trpc/guestbook.create?batch=1') && res.status() === 200
    )
    await page.waitForResponse(
      (res) =>
        res.url().includes('/api/trpc/guestbook.getInfiniteMessages?batch=1') &&
        res.status() === 200
    )

    await expect(page.getByTestId('guestbook-messages-list').getByText(message)).toBeVisible()
  })

  test('should be able to delete a message', async ({ page }) => {
    const message = createId()

    await db.insert(guestbook).values({
      id: createId(),
      body: message,
      userId: TEST_USER.id
    })

    await page.waitForResponse(
      (res) => res.url().includes('/api/trpc/guestbook.getInfiniteMessages') && res.status() === 200
    )

    const messageBlock = page.locator('div[id^=message]', { hasText: message })
    await messageBlock.getByRole('button', { name: 'Delete' }).click()

    await page.getByRole('button', { name: 'Delete' }).click()

    await page.waitForResponse(
      (res) => res.url().includes('/api/trpc/guestbook.delete?batch=1') && res.status() === 200
    )
    await page.waitForResponse(
      (res) =>
        res.url().includes('/api/trpc/guestbook.getInfiniteMessages?batch=1') &&
        res.status() === 200
    )

    await expect(page.getByTestId('guestbook-messages-list').getByText(message)).toBeHidden()
  })
})
