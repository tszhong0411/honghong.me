import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

const resolve = (path: string) => new URL(path, import.meta.url).pathname

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
      '@': resolve('src'),
      'contentlayer/generated': resolve('src/tests/mocks/contentlayer.ts')
    }
  }
})
