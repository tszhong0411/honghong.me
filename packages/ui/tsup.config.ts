import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*@(ts|tsx)'],
  dts: true,
  format: ['esm'],
  target: 'esnext',
  clean: true
})
