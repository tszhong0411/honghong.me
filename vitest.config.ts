import { coverageConfigDefaults, defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['lcov', 'html'],
      all: true,
      provider: 'v8',
      exclude: [
        ...coverageConfigDefaults.exclude,
        'packages/*/dist/**',
        '**/coverage/**',
        '**/fixtures/**',
        '**/tests/**'
      ]
    }
  }
})
