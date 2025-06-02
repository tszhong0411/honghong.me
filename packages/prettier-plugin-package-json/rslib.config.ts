import { defineConfig } from '@rslib/core'

export default defineConfig({
  lib: [
    {
      format: 'esm',
      dts: true,
      bundle: false
    }
  ],
  source: {
    entry: {
      index: ['./src/**']
    },
    tsconfigPath: './tsconfig.build.json'
  }
})
