import type { Page } from '@playwright/test'

export const scrollToBottom = async (page: Page) => {
  await page.evaluate(async () => {
    for (let i = 0; i < document.body.scrollHeight; i += 100) {
      window.scrollTo(0, i)

      await new Promise((resolve) => setTimeout(resolve, 100))
    }
  })
}
