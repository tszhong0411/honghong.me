import { defineConfig, devices } from '@playwright/test'

const CI = !!process.env.CI

const baseURL = 'http://localhost:3000'

export default defineConfig({
  globalTimeout: CI ? 1000 * 60 * 10 : undefined,
  testDir: './src/tests/e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    headless: true,
    video: 'on'
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] }
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] }
    }
  ],
  webServer: {
    command: `pnpm next ${CI ? 'start' : 'dev'}`,
    url: baseURL,
    timeout: 1000 * 60 * 5,
    reuseExistingServer: !CI
  }
})
