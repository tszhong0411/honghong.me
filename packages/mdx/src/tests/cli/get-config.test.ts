import { getErrorMessage } from '@tszhong0411/utils'
import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { getConfig } from '@/cli/get-config'

describe('getConfig', () => {
  it('should throw an error if no configuration is found', async () => {
    try {
      await getConfig(path.resolve(import.meta.dirname, '../fixtures/config-empty'))
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(getErrorMessage(error)).includes('No configuration found')
    }
  })

  it('should return the configuration if found', async () => {
    const config = await getConfig(path.resolve(import.meta.dirname, '../fixtures/config'))

    expect(config).toEqual({
      config: {
        default: {
          contentDirPath: 'content',
          collections: [
            {
              name: 'Page',
              filePathPattern: 'pages/*.mdx'
            }
          ]
        }
      },
      filepath: path.resolve(import.meta.dirname, '../fixtures/config/mdx.config.ts')
    })
  })
})
