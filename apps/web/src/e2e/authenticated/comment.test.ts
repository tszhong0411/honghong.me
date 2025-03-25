import { expect, test } from '@playwright/test'
import { comments, db, eq } from '@tszhong0411/db'

test.describe('comment page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test')
  })

  test('should be able to submit a comment', async ({ page }) => {
    await page.waitForResponse(
      (res) => res.url().includes('comments.getInfiniteComments') && res.status() === 200
    )

    await page.getByPlaceholder('Leave a comment').fill('Test Comment')
    await page.getByRole('button', { name: 'Send comment' }).click()

    await page.waitForResponse((res) => res.url().includes('comments.post') && res.status() === 200)
    await page.waitForResponse(
      (res) => res.url().includes('comments.getInfiniteComments') && res.status() === 200
    )

    await expect(page.getByTestId('comments-list').getByText('Test Comment')).toBeVisible()
  })
})

test.afterAll(async () => {
  await db.delete(comments).where(eq(comments.postId, 'test'))
})
