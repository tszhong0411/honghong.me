import test, { chromium } from '@playwright/test'
import { desktopConfig } from 'lighthouse'
import { playAudit } from 'playwright-lighthouse'

test('should pass lighthouse audit', async () => {
  const browser = await chromium.launch({
    args: ['--remote-debugging-port=9222']
  })

  const page = await browser.newPage()
  await page.goto('http://localhost:3000')

  await playAudit({
    page,
    port: 9222,
    reports: {
      formats: {
        html: true,
        json: true
      }
    },
    config: desktopConfig,
    thresholds: {
      performance: 95,
      accessibility: 95,
      'best-practices': 95,
      seo: 95
    }
  })

  await browser.close()
})
