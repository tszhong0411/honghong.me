import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
    exclude: ['node_modules', './src/tests/e2e'],
    coverage: {
      reporter: ['lcov', 'html'],
      all: false,
      provider: 'v8'
    },
    alias: {
      '@': new URL('src', import.meta.url).pathname,
      'contentlayer/generated': new URL(
        'src/tests/mocks/contentlayer.ts',
        import.meta.url
      ).pathname
    }
  }
})
