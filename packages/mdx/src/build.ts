import type { Config } from '@/types'

import fs from 'node:fs/promises'

import { getErrorMessage } from '@tszhong0411/utils'
import chokidar from 'chokidar'
import pluralize from 'pluralize'

import { generateData } from '@/generation'
import { getConfig } from '@/utils/get-config'
import { logger } from '@/utils/logger'
import { writeJSON } from '@/utils/write-json'

type Options = {
  watch?: boolean
}

const watchImpl = (config: Config) => {
  const { contentDirPath, cache } = config

  const watcher = chokidar.watch([contentDirPath, 'mdx.config.ts'], {
    ignored: (p, stats) =>
      stats ? stats.isFile() && !p.endsWith('.mdx') && p !== 'mdx.config.ts' : false,
    persistent: true,
    ignoreInitial: true,
    awaitWriteFinish: {
      stabilityThreshold: 500,
      pollInterval: 100
    }
  })

  logger.info(`Watching for changes in '${contentDirPath}'`)

  watcher.on('all', async (event, p) => {
    if (event === 'addDir' || event === 'unlinkDir') return

    if (p === 'mdx.config.ts') {
      logger.warn('Config file changed, restarting...')
      watcher.close()
      cache.clear()
      build({ watch: true })
      return
    }

    if (cache.has(p)) cache.delete(p)

    const begin = performance.now()
    logger.info(`${p} has been changed, rebuilding...`)
    await generateData(config)
    logger.info('rebuild finished', begin)
  })
}

export const build = async (options: Options = {}) => {
  const { watch = false } = options
  const { config } = await getConfig(process.cwd())

  try {
    const begin = performance.now()

    await fs.mkdir('.mdx/generated', { recursive: true })
    await createPackageJson()
    const count = await generateData(config)

    logger.info(`Generated ${pluralize('document', count, true)} in .mdx`, begin)

    if (watch) watchImpl(config)
  } catch (error) {
    throw new Error(`An error occurred during the build process: ${getErrorMessage(error)}`)
  }
}

const createPackageJson = async () => {
  const packageJsonContent = {
    name: 'mdx-generated',
    description: 'Generated MDX data',
    version: '0.0.0',
    exports: {
      './generated': {
        import: './generated/index.mjs'
      }
    },
    typesVersions: {
      '*': {
        generated: ['./generated']
      }
    }
  }

  await writeJSON('.mdx/package.json', packageJsonContent)
}
