import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { A11Y_TAGS } from '../constants'

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues in light mode', async ({
    page
  }) => {
    await page.goto('/')

    const a11yResults = await new AxeBuilder({ page }).withTags(A11Y_TAGS).analyze()

    expect(a11yResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues in dark mode', async ({
    page
  }) => {
    await page.goto('/')

    await page.locator('[data-test-id="theme-toggle"]').click()
    await page.locator(`[data-test-id="theme-dark-button"]`).click()

    const a11yResults = await new AxeBuilder({ page }).withTags(A11Y_TAGS).analyze()

    expect(a11yResults.violations).toEqual([])
  })
})
