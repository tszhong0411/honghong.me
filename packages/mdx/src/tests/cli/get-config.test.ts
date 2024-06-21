import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { LOG_PREFIX } from '@/cli/constants'
import { getConfig } from '@/cli/get-config'

describe('getConfig', () => {
  it('should throw an error if no configuration is found', async () => {
    try {
      await getConfig(path.resolve(import.meta.dirname, '../fixtures/config-empty'))
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect((error as Error).message).toBe(`${LOG_PREFIX}No configuration found`)
    }
  })

  it('should return the configuration if found', async () => {
    const config = await getConfig(path.resolve(import.meta.dirname, '../fixtures/config'))

    expect(config).toEqual({
      config: {
        contentDirPath: 'content',
        defs: [
          {
            name: 'Page',
            filePathPattern: 'pages/*.mdx'
          }
        ]
      },
      filepath: path.resolve(import.meta.dirname, '../fixtures/config/mdx.config.ts')
    })
  })
})
