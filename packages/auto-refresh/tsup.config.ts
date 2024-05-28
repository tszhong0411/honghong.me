import fs from 'node:fs/promises'
import path from 'node:path'
import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts', 'src/react.ts'],
  dts: true,
  format: ['esm'],
  target: 'esnext',
  onSuccess: async () => {
    const banner = '"use client";\n'
    const filePath = path.resolve(process.cwd(), 'dist/react.mjs')
    const content = await fs.readFile(filePath, 'utf8')
    await fs.writeFile(filePath, banner + content)
  }
})
