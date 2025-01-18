import { getErrorMessage } from '@tszhong0411/utils'
import chokidar from 'chokidar'
import matter from 'gray-matter'
import fs from 'node:fs/promises'
import path from 'node:path'
import pluralize from 'pluralize'

import { generateData } from '@/cli/generation'
import { getConfig } from '@/cli/get-config'
import { getDocumentsCount } from '@/cli/get-documents-count'
import { getEntries } from '@/cli/get-entries'
import type { Collection, Config, Fields } from '@/types'
import { logger } from '@/utils/logger'
import { writeJSON } from '@/utils/write-json'

type MissingField = {
  name: string
  type: string
}

type Error = {
  file: string
  type: string
  missingFields: MissingField[]
}

type Options = {
  watch?: boolean
}

const watchImpl = (config: Config) => {
  const { contentDirPath } = config

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
      build({ watch: true })
      return
    }

    const begin = performance.now()
    logger.info(`${p} has been changed, rebuilding...`)
    await generateData(config)
    logger.info('rebuild finished', begin)
  })
}

export const build = async (options: Options = {}) => {
  const { watch = false } = options
  const { config } = await getConfig(process.cwd())
  const { contentDirPath, collections } = config

  try {
    const begin = performance.now()
    await ensureDirectoryExists(contentDirPath)
    await createGeneratedDirectory()
    await createPackageJson()

    const errors = await findErrors(collections, contentDirPath)

    if (errors.length > 0) {
      throw new Error(formatErrorMessage(errors))
    }

    await generateData(config)

    const count = await getDocumentsCount(contentDirPath)

    logger.info(`Generated ${pluralize('document', count, true)} in .mdx`, begin)

    if (watch) watchImpl(config)
  } catch (error) {
    throw new Error(`An error occurred during the build process: ${getErrorMessage(error)}`)
  }
}

const ensureDirectoryExists = async (dirPath: string) => {
  try {
    await fs.access(dirPath)
  } catch {
    throw new Error(`Directory ${dirPath} does not exist. Please check your configuration.`)
  }
}

const createGeneratedDirectory = async () => {
  await fs.mkdir('.mdx/generated', { recursive: true })
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

const findErrors = async (collections: Collection[], contentDirPath: string): Promise<Error[]> => {
  const errors: Error[] = []

  for (const collection of collections) {
    const entries = await getEntries(collection.filePathPattern, contentDirPath)

    for (const entry of entries) {
      const fullPath = path.join(process.cwd(), contentDirPath, entry)

      if (collection.fields) {
        const missingFields = await validateRequiredFields(collection.fields, fullPath)
        if (missingFields.length > 0) {
          errors.push({
            file: entry,
            type: collection.name,
            missingFields
          })
        }
      }
    }
  }

  return errors
}

const validateRequiredFields = async (
  fields: Fields,
  fullPath: string
): Promise<MissingField[]> => {
  const requiredFields = fields.filter((field) => field.required)

  const fileContent = await fs.readFile(fullPath, 'utf8')
  const parsedContent = matter(fileContent)

  return requiredFields.filter((field) => !parsedContent.data[field.name])
}

const formatErrorMessage = (errors: Error[]): string => {
  let errorMessage = 'Generation Failed\n\n'
  errorMessage += `└── Missing required fields for ${errors.length} documents.\n\n`

  for (const { file, type, missingFields } of errors) {
    errorMessage += `     • "${file}" (of type "${type}") is missing the following required fields:\n`

    for (const [i, field] of missingFields.entries()) {
      const isLastField = i === missingFields.length - 1
      errorMessage += `       • ${field.name}: ${field.type}${isLastField ? '\n\n' : '\n'}`
    }
  }

  return errorMessage
}
