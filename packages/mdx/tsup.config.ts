import { defineConfig } from 'tsup'

export default defineConfig({
  // entry: ['src/index.ts', 'src/cli/index.ts', 'src/core/client.tsx'],
  entry: {
    index: 'src/index.ts',
    cli: 'src/cli/index.ts',
    client: 'src/core/client.tsx'
  },
  dts: true,
  format: ['esm'],
  target: 'esnext'
})
