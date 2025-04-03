import { expect, test } from '@playwright/test'

test.describe('like button', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/blog/test-like')
  })

  test('should be able to like a post', async ({ page }) => {
    const likeCount = page.getByTestId('like-count')
    // @ts-expect-error -- internal property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- internal property
    expect(await likeCount.evaluate((flow) => flow._internals.ariaLabel)).toBe('0')

    await page.getByTestId('like-button').click()
    // @ts-expect-error -- internal property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- internal property
    expect(await likeCount.evaluate((flow) => flow._internals.ariaLabel)).toBe('1')

    await page.getByTestId('like-button').click()
    await page.getByTestId('like-button').click()
    // @ts-expect-error -- internal property
    // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- internal property
    expect(await likeCount.evaluate((flow) => flow._internals.ariaLabel)).toBe('3')
  })
})
