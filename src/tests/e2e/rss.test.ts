import { expect, test } from '@playwright/test'
import { XMLValidator } from 'fast-xml-parser'

test('rss page', async ({ page }) => {
  const res = await page.goto('/rss.xml')

  expect(res?.status()).toBe(200)

  const body = await res?.text()
  const isXml = XMLValidator.validate(body as string)

  expect(isXml).toBe(true)
})
