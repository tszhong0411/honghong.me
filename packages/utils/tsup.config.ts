import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*.ts'],
  dts: true,
  format: ['esm'],
  target: 'esnext',
  clean: true
})
