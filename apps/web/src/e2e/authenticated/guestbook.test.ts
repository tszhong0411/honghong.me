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

    await page.getByTestId('guestbook-textarea').fill(message)
    await page.getByTestId('guestbook-submit-button').click()

    await expect(page.getByTestId('guestbook-messages-list').getByText(message)).toBeVisible()
    await expect(page.locator('li[data-sonner-toast]')).toContainText('Create message successfully')

    // Remove the message
    await db.delete(guestbook).where(eq(guestbook.body, message))
  })

  test('should be able to delete a message', async ({ page }) => {
    const id = createId()

    await db.insert(guestbook).values({
      id,
      body: 'Test message',
      userId: TEST_USER.id
    })

    const messageBlock = page.getByTestId(`message-${id}`)
    await messageBlock.getByTestId('guestbook-delete-button').click()

    const deleteDialog = page.getByTestId('guestbook-dialog')
    await deleteDialog.getByTestId('guestbook-dialog-delete-button').click()

    await expect(messageBlock).toBeHidden()
    await expect(page.locator('li[data-sonner-toast]')).toContainText('Delete message successfully')

    // Remove the message
    await db.delete(guestbook).where(eq(guestbook.id, id))
  })
})
