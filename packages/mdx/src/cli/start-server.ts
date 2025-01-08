import chokidar from 'chokidar'
import { exit } from 'node:process'

import { build } from './commands'
import { LOG_PREFIX } from './constants'
import { getConfig } from './get-config'

const startServer = async () => {
  const { config, filepath } = await getConfig(process.cwd())

  const mdxWatcher = chokidar.watch(config.contentDirPath, {
    ignored: (path, stats) => (stats ? stats.isFile() && !path.endsWith('.mdx') : false),
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100
    }
  })

  const configWatcher = chokidar.watch(filepath, {
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100
    }
  })

  mdxWatcher
    .on('ready', async () => {
      console.log(`${LOG_PREFIX}Watching for file changes...`)
      await build()
    })
    .on('add', async (path) => {
      console.log(`${LOG_PREFIX}${path} has been added.`)
      await build()
    })
    .on('change', async (path) => {
      console.log(`${LOG_PREFIX}${path} has been changed.`)
      await build()
    })
    .on('unlink', async (path) => {
      console.log(`${LOG_PREFIX}${path} has been removed.`)
      await build()
    })

  configWatcher.on('change', () => {
    console.log(`${LOG_PREFIX}Config file changed. Restarting...`)
    exit(99)
  })

  const handleTermination = async () => {
    console.log(`${LOG_PREFIX}Terminating watcher...`)
    await Promise.all([mdxWatcher.close(), configWatcher.close()])
    console.log(`${LOG_PREFIX}Watcher closed.`)
    console.log(`${LOG_PREFIX}Exiting...`)
  }

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']

  for (const signal of signals) {
    process.on(signal, handleTermination)
  }
}

startServer()
