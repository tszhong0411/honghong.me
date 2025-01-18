import { cosmiconfig } from 'cosmiconfig'
import { createJiti } from 'jiti'
import path from 'node:path'

import type { Config } from '@/types'

const jiti = createJiti(import.meta.url, {
  alias: {
    '@': path.join(process.cwd(), '../../packages/mdx/src')
  }
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
