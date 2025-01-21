import type { Config } from '@/types'

import path from 'node:path'

import { cosmiconfig } from 'cosmiconfig'
import { createJiti } from 'jiti'

const jiti = createJiti(import.meta.url, {
  alias: {
    '@': path.join(process.cwd(), '../../packages/mdx/src')
  },
  moduleCache: false // disable config import cache
})

export const getConfig = async (cwd: string) => {
  const explorer = cosmiconfig('mdx', {
    searchPlaces: ['mdx.config.ts'],
    loaders: {
      '.ts': jiti
    }
  })

  const configResult = await explorer.search(cwd)

  if (!configResult) {
    throw new Error('No configuration found, create mdx.config.ts in your root directory.')
  }

  return {
    config: {
      ...configResult.config.default,
      cache: new Map()
    } as Config,
    filepath: configResult.filepath
  }
}
