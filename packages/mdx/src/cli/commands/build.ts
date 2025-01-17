import { getErrorMessage } from '@tszhong0411/utils'
import matter from 'gray-matter'
import fs from 'node:fs/promises'
import path from 'node:path'
import pluralize from 'pluralize'

import type { Collection, Fields } from '@/types'

import { logger } from '../../utils/logger'
import { generateData } from '../generation'
import { getConfig } from '../get-config'
import { getDocumentsCount } from '../get-documents-count'
import { getEntries } from '../get-entries'
import { writeJSON } from '../utils'

type MissingField = {
  name: string
  type: string
}

type Error = {
  file: string
  type: string
  missingFields: MissingField[]
}

export const build = async () => {
  const { config } = await getConfig(process.cwd())
  const { contentDirPath, collections } = config

  try {
    await ensureDirectoryExists(contentDirPath)
    await createGeneratedDirectory()
    await createPackageJson()

    const errors = await findErrors(collections, contentDirPath)

    if (errors.length > 0) {
      throw new Error(formatErrorMessage(errors))
    }

    await generateData(config)

    const count = await getDocumentsCount(contentDirPath)

    logger.info(`Generated ${pluralize('document', count, true)} in .mdx.`)
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
