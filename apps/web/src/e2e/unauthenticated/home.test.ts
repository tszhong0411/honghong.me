import { AxeBuilder } from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

import { A11Y_TAGS } from '../constants'
import { createBrowserContext } from '../utils/theme'

test.describe('homepage', () => {
  test('should not have any automatically detectable accessibility issues in light mode', async ({
    page
  }) => {
    await page.goto('/')

    const a11yResults = await new AxeBuilder({ page }).withTags(A11Y_TAGS).analyze()

    expect(a11yResults.violations).toEqual([])
  })

  test('should not have any automatically detectable accessibility issues in dark mode', async ({
    browser,
    baseURL
  }) => {
    const context = await createBrowserContext(browser, {
      baseURL,
      localStorage: [{ name: 'theme', value: 'dark' }]
    })

    const page = await context.newPage()

    await page.goto('/')

    const a11yResults = await new AxeBuilder({ page }).withTags(A11Y_TAGS).analyze()

    expect(a11yResults.violations).toEqual([])
  })
})
