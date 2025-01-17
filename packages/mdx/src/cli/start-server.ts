import chokidar from 'chokidar'
import { exit } from 'node:process'

import { logger } from '../utils/logger'
import { build } from './commands'
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
      logger.info('Watching for file changes...')
      await build()
    })
    .on('add', async (path) => {
      logger.info(`${path} has been added.`)
      await build()
    })
    .on('change', async (path) => {
      logger.info(`${path} has been changed.`)
      await build()
    })
    .on('unlink', async (path) => {
      logger.info(`${path} has been removed.`)
      await build()
    })

  configWatcher.on('change', () => {
    logger.warn('Config file changed. Restarting...')
    exit(99)
  })

  const handleTermination = async () => {
    logger.info('Terminating watcher...')
    await Promise.all([mdxWatcher.close(), configWatcher.close()])
    logger.info('Watcher closed.')
    logger.info('Exiting...')
  }

  const signals: NodeJS.Signals[] = ['SIGINT', 'SIGTERM']

  for (const signal of signals) {
    process.on(signal, handleTermination)
  }
}

startServer()
