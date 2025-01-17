import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    workspace: ['apps/*/vitest.config.ts', 'packages/*/vitest.config.ts'],
    coverage: {
      reporter: ['lcov', 'html'],
      all: true,
      provider: 'v8',
      exclude: [
        ...coverageConfigDefaults.exclude,
        '**/dist/**',
        '**/coverage/**',
        '**/fixtures/**',
        '**/tests/**',
        './turbo/**',
        './scripts/**'
      ]
    }
  }
})
