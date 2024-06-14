import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      reporter: ['lcov', 'html'],
      all: true,
      provider: 'v8',
      include: ['apps/**', 'packages/**'],
      exclude: ['**/tests/**', '**/.next/**', '**/.mdx/**', '**/.eslint-config-inspector/**']
    }
  }
})
