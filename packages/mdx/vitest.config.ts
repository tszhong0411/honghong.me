import { defineProject, mergeConfig } from 'vitest/config'

import { sharedProjectConfig } from '../../vitest.shared'

const resolve = (path: string) => new URL(path, import.meta.url).pathname

export default mergeConfig(
  sharedProjectConfig,
  defineProject({
    resolve: {
      alias: {
        '@': resolve('./src')
      }
    }
  })
)
