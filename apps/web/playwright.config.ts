import { defineConfig, devices } from '@playwright/test'

const CI = !!process.env.CI

const baseURL = 'http://localhost:3000'

export default defineConfig({
  globalTimeout: CI ? 1000 * 60 * 10 : undefined,
  testDir: './src/e2e',
  fullyParallel: true,
  forbidOnly: CI,
  retries: CI ? 2 : 0,
  workers: CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL,
    trace: 'on-first-retry',
    video: 'on'
  },
  projects: [
    { name: 'authenticated', testMatch: /.*\.authenticated\.test\.ts/ },
    { name: 'unauthenticated', testMatch: /.*\.unauthenticated\.test\.ts/ },
    { name: 'setup', testMatch: /.*\.setup\.ts/ },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: './src/e2e/.auth/user.json',
        contextOptions: {
          permissions: ['clipboard-read', 'clipboard-write']
        }
      },
      dependencies: ['setup']
    }
  ],
  webServer: {
    command: `pnpm ${CI ? 'start' : 'dev'}`,
    url: baseURL,
    timeout: 1000 * 60 * 5,
    reuseExistingServer: !CI
  }
})
