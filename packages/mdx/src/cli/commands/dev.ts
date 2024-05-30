import * as chokidar from 'chokidar'

import { LOG_PREFIX } from '../constants'
import { getConfig } from '../get-config'
import { build } from './build'

export const dev = async () => {
  const { contentDirPath } = await getConfig()

  // Initial build
  await build()

  const watcher = chokidar.watch(`${contentDirPath}/**/*.mdx`, {
    persistent: true
  })

  watcher.on('change', async (path) => {
    console.log(`${LOG_PREFIX}${path} has changed. Rebuilding...`)
    await build()
  })

  console.log(`${LOG_PREFIX}Watching for file changes...`)

  const handleTermination = () => {
    console.log(`${LOG_PREFIX}Terminating watcher...`)
    watcher.close().then(() => {
      console.log(`${LOG_PREFIX}Watcher closed.`)
      throw new Error('Process terminated.')
    })
  }

  process.on('SIGINT', handleTermination)
  process.on('SIGTERM', handleTermination)
}
