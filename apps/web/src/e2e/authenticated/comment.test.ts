import { createId } from '@paralleldrive/cuid2'
import { expect, test } from '@playwright/test'
import { comments, db } from '@tszhong0411/db'

import { TEST_USER } from '../constants'

test.describe('comment page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test')
  })

  test('should be able to submit a comment', async ({ page }) => {
    const message = createId()

    await page.getByTestId('comment-textarea').fill(message)
    await page.getByTestId('comment-submit-button').click()

    await expect(page.getByTestId('comments-list').getByText(message)).toBeVisible()
    await expect(page.locator('li[data-sonner-toast]')).toContainText('Comment posted')
  })

  test('should be able to delete a comment', async ({ page }) => {
    const id = createId()
    const message = 'Test Comment'

    await db.insert(comments).values({
      id,
      body: message,
      postId: 'test',
      userId: TEST_USER.id
    })

    const commentBlock = page.getByTestId(`comment-${id}`)
    await commentBlock.getByTestId('comment-menu-button').click()

    await page.getByTestId('comment-delete-button').click()

    const deleteDialog = page.getByTestId('comment-dialog')
    await deleteDialog.getByTestId('comment-dialog-delete-button').click()

    await expect(commentBlock).toBeHidden()
    await expect(page.locator('li[data-sonner-toast]')).toContainText('Deleted a comment')
  })
})
