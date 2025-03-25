import { createId } from '@paralleldrive/cuid2'
import { expect, test } from '@playwright/test'
import { db, eq, guestbook } from '@tszhong0411/db'

import { TEST_USER } from '../constants'

test.describe('guestbook page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/guestbook')
  })

  test('should be able to submit a message', async ({ page }) => {
    const message = createId()

    await page.waitForResponse(
      (res) => res.url().includes('guestbook.getInfiniteMessages') && res.status() === 200
    )

    await page.getByPlaceholder('Leave a message').fill(message)
    await page.getByRole('button', { name: 'Submit' }).click()

    await page.waitForResponse(
      (res) => res.url().includes('guestbook.create') && res.status() === 200
    )
    await page.waitForResponse(
      (res) => res.url().includes('guestbook.getInfiniteMessages') && res.status() === 200
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
      (res) => res.url().includes('guestbook.getInfiniteMessages') && res.status() === 200
    )

    const messageBlock = page.locator('div[id^=message]', { hasText: message })
    await messageBlock.getByRole('button', { name: 'Delete' }).click()

    const deleteDialog = page.locator('div[role=alertdialog]')
    await deleteDialog.getByRole('button', { name: 'Delete' }).click()

    await page.waitForResponse(
      (res) => res.url().includes('guestbook.delete') && res.status() === 200
    )
    await page.waitForResponse(
      (res) => res.url().includes('guestbook.getInfiniteMessages') && res.status() === 200
    )

    await expect(page.getByTestId('guestbook-messages-list').getByText(message)).toBeHidden()
  })
})

test.afterAll(async () => {
  await db.delete(guestbook).where(eq(guestbook.userId, TEST_USER.id))
})
