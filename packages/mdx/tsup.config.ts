import { defineConfig } from 'tsup'

export default defineConfig({
  entry: {
    cli: 'src/cli/index.ts'
  },
  dts: true,
  format: ['esm'],
  target: 'esnext',
  clean: true
})
