import { mergeConfig } from 'vitest/config'

import { sharedProjectConfig } from '../../vitest.shared'

const resolve = (path: string) => new URL(path, import.meta.url).pathname

export default mergeConfig(sharedProjectConfig, {
  resolve: {
    alias: {
      '@': resolve('./src')
    }
  }
})
