import * as chokidar from 'chokidar'

import { LOG_PREFIX } from '../constants'
import { getConfig } from '../get-config'
import { build } from './build'

export const dev = async () => {
  const { contentDirPath } = await getConfig(process.cwd())

  // Initial build
  await build()

  const watcher = chokidar.watch(`${contentDirPath}/**/*.mdx`, {
    persistent: true
  })

  watcher.on('change', (path) => {
    console.log(`${LOG_PREFIX}${path} has changed. Rebuilding...`)
    void build()
  })

  console.log(`${LOG_PREFIX}Watching for file changes...`)

  const handleTermination = async () => {
    console.log(`${LOG_PREFIX}Terminating watcher...`)

    await watcher.close()

    console.log(`${LOG_PREFIX}Watcher closed.`)
    console.log(`${LOG_PREFIX}Exiting...`)
  }

  process.on('SIGINT', () => {
    void handleTermination()
  })
  process.on('SIGTERM', () => {
    void handleTermination()
  })
}
