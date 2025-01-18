import type { NextConfig } from 'next'

import { build } from './build'

export const withMDX = async (config: NextConfig) => {
  const isDev = process.argv.includes('dev')
  const isBuild = process.argv.includes('build')
  if (!process.env.MDX_STARTED && (isDev || isBuild)) {
    process.env.MDX_STARTED = '1'
    await build({ watch: isDev })
  }

  return config
}
