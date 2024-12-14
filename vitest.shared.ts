import { defineConfig } from 'vitest/config'

export const sharedProjectConfig = defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**']
  }
})
