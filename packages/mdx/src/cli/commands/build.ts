import matter from 'gray-matter'
import fs from 'node:fs/promises'
import path from 'node:path'
import pluralize from 'pluralize'

import type { DocumentType, FieldDefs } from '@/types'

import { LOG_PREFIX } from '../constants'
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
  const {
    config: { contentDirPath, defs }
  } = await getConfig(process.cwd())

  try {
    await ensureDirectoryExists(contentDirPath)
    await createGeneratedDirectory()
    await createPackageJson()

    const errors = await findErrors(defs, contentDirPath)

    if (errors.length > 0) {
      console.error(LOG_PREFIX, formatErrorMessage(errors))
      return
    }

    await generateData(defs, contentDirPath)

    const count = await getDocumentsCount(contentDirPath)

    console.log(`${LOG_PREFIX}Generated ${pluralize('document', count, true)} in .mdx.`)
  } catch (error) {
    console.error(`${LOG_PREFIX}An error occurred during the build process:`, error)
  }
}

const ensureDirectoryExists = async (dirPath: string) => {
  try {
    await fs.access(dirPath)
  } catch {
    throw new Error(
      `${LOG_PREFIX}Directory ${dirPath} does not exist. Please check your configuration.`
    )
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

const findErrors = async (defs: DocumentType[], contentDirPath: string): Promise<Error[]> => {
  const errors: Error[] = []

  for (const def of defs) {
    const entries = await getEntries(def.filePathPattern, contentDirPath)

    for (const entry of entries) {
      const fullPath = path.join(process.cwd(), contentDirPath, entry)

      if (def.fields) {
        const missingFields = await validateRequiredFields(def.fields, fullPath)
        if (missingFields.length > 0) {
          errors.push({
            file: entry,
            type: def.name,
            missingFields
          })
        }
      }
    }
  }

  return errors
}

const validateRequiredFields = async (
  fields: FieldDefs,
  fullPath: string
): Promise<MissingField[]> => {
  const requiredFields = fields.filter((field) => field.required)

  const fileContent = await fs.readFile(fullPath, 'utf8')
  const parsedContent = matter(fileContent)

  return requiredFields.filter((field) => !parsedContent.data[field.name])
}

const formatErrorMessage = (errors: Error[]): string => {
  let errorMessage = 'Error: Generation Failed\n\n'
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
