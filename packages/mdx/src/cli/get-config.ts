import { cosmiconfig } from 'cosmiconfig'
import { createJiti } from 'jiti'

import type { MakeSourceOptions } from '@/types'

import { LOG_PREFIX } from './constants'

const jiti = createJiti(import.meta.url)

export const getConfig = async (cwd: string) => {
  const explorer = cosmiconfig('mdx', {
    searchPlaces: ['mdx.config.ts'],
    loaders: {
      '.ts': jiti
    }
  })

  const configResult = await explorer.search(cwd)

  if (!configResult) {
    throw new Error(`${LOG_PREFIX}No configuration found`)
  }

  return {
    config: configResult.config as MakeSourceOptions,
    filepath: configResult.filepath
  }
}
