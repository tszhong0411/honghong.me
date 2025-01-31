import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/**/*@(ts|tsx)', 'src/styles/*.css'],
  dts: true,
  format: ['esm'],
  target: 'esnext',
  clean: true,
  loader: {
    // Just copy the CSS files
    '.css': 'copy'
  }
})
