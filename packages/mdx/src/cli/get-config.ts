import { cosmiconfig } from 'cosmiconfig'

import type { MakeSourceOptions } from '@/source-files/make-source'

import { LOG_PREFIX } from './constants'

export const getConfig = async (cwd: string) => {
  const explorer = cosmiconfig('mdx', {
    searchPlaces: ['mdx.config.ts']
  })

  const configResult = await explorer.search(cwd)

  if (!configResult) {
    throw new Error(`${LOG_PREFIX}No configuration found`)
  }

  return configResult.config as MakeSourceOptions
}
