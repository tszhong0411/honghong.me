import chokidar from 'chokidar'
import debounce from 'debounce'
import { exit } from 'node:process'

import { build } from './commands'
import { LOG_PREFIX } from './constants'
import { getConfig } from './get-config'

const startServer = async () => {
  const {
    config: { contentDirPath },
    filepath
  } = await getConfig(process.cwd())

  // Initial build
  await build()

  const { glob } = (await import('fast-glob')).default
  const files = await glob(`${contentDirPath}/**/*.mdx`)

  const watcher = chokidar.watch(files, {
    ignored: (p) => !p.endsWith('.mdx')
  })

  const configWatcher = chokidar.watch(filepath)

  const debounceBuild = debounce((p) => {
    console.log(`${LOG_PREFIX}${p} has changed. Rebuilding...`)
    void build()
  }, 500)

  watcher.on('change', debounceBuild)

  configWatcher.on('change', () => {
    console.log(`${LOG_PREFIX}Config file changed. Restarting...`)
    exit(99)
  })

  console.log(`${LOG_PREFIX}Watching for file changes...`)

  const handleTermination = async () => {
    console.log(`${LOG_PREFIX}Terminating watcher...`)
    await Promise.all([watcher.close(), configWatcher.close()])
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

startServer()
