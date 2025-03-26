import { expect, test } from '@playwright/test'
import { comments, db, eq } from '@tszhong0411/db'

test.describe('comment page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test')
  })

  test('should be able to submit a comment', async ({ page }) => {
    const message = 'Test Comment'

    await page.getByTestId('comment-textarea').fill(message)
    await page.getByTestId('comment-submit-button').click()

    await expect(page.getByTestId('comments-list').getByText(message)).toBeVisible()
  })
})

test.afterAll(async () => {
  await db.delete(comments).where(eq(comments.postId, 'test'))
})
