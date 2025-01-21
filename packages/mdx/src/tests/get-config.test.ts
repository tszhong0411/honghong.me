import path from 'node:path'

import { getErrorMessage } from '@tszhong0411/utils'
import { describe, expect, it } from 'vitest'

import { getConfig } from '@/utils/get-config'

describe('getConfig', () => {
  it('should throw an error if no configuration is found', async () => {
    try {
      await getConfig(path.resolve(import.meta.dirname, './fixtures/config-empty'))
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(getErrorMessage(error)).includes('No configuration found')
    }
  })

  it('should return the configuration if found', async () => {
    const config = await getConfig(path.resolve(import.meta.dirname, './fixtures/config'))

    expect(config).toEqual({
      config: {
        contentDirPath: 'content',
        collections: [
          {
            name: 'Page',
            filePathPattern: 'pages/*.mdx'
          }
        ],
        cache: new Map()
      },
      filepath: path.resolve(import.meta.dirname, './fixtures/config/mdx.config.ts')
    })
  })
})
