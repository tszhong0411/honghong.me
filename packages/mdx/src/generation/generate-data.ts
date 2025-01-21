import type { Collection, Config } from '@/types'
import type { Options } from '@mdx-js/esbuild'

import fs from 'node:fs/promises'
import path from 'node:path'

import { bundleMDX } from 'mdx-bundler'

import { BASE_FOLDER_PATH } from '@/constants'
import { defaultRehypePlugins, defaultRemarkPlugins } from '@/plugins'
import { getEntries } from '@/utils/get-entries'
import { getTOC } from '@/utils/get-toc'
import { logger } from '@/utils/logger'
import { validateFrontmatter } from '@/utils/validate-frontmatter'
import { writeJSON } from '@/utils/write-json'

import { generateIndexDts } from './generate-index-d-ts'
import { generateIndexMjs } from './generate-index-mjs'
import { generateTypesDts } from './generate-types-d-ts'

const processMDXContent = (source: string, config: Config) => {
  const { remarkPlugins = [], rehypePlugins = [] } = config

  return bundleMDX({
    source,
    mdxOptions: (options: Options) => {
      options.remarkPlugins = [
        ...(options.remarkPlugins ?? []),
        ...defaultRemarkPlugins,
        ...remarkPlugins
      ]
      options.rehypePlugins = [
        ...(options.rehypePlugins ?? []),
        ...defaultRehypePlugins,
        ...rehypePlugins
      ]

      return options
    }
  })
}

const processFields = async (
  entry: string,
  content: string,
  data: Record<string, unknown>,
  code: string,
  collection: Collection
) => {
  const fileName = path.basename(entry, '.mdx')
  const staticFields = {
    ...data,
    code,
    raw: content,
    fileName: fileName,
    filePath: entry,
    toc: await getTOC(content)
  }

  const computedFields: Record<string, unknown> = {}

  if (collection.computedFields) {
    for (const computedField of collection.computedFields) {
      computedFields[computedField.name] = await computedField.resolve({
        ...staticFields
      })
    }
  }

  return {
    ...staticFields,
    ...computedFields
  }
}

export const generateData = async (config: Config): Promise<number> => {
  const { contentDirPath, collections, cache } = config
  let documentGenerationCount = 0

  for (const collection of collections) {
    const entries = await getEntries(collection.filePathPattern, contentDirPath)

    const collectionFolderPath = `${BASE_FOLDER_PATH}/${collection.name}`

    const indexJson = []

    await fs.mkdir(collectionFolderPath, { recursive: true })

    for (const entry of entries) {
      const fullPath = path.join(contentDirPath, entry)
      const fileContent = await fs.readFile(fullPath, 'utf8')

      const cached = cache.get(fullPath)

      if (cached) {
        indexJson.push(cached)
        continue
      }

      const { code, matter } = await processMDXContent(fileContent, config)

      const { data, content } = matter

      if (collection.fields) {
        const errors = validateFrontmatter(data, collection.fields)

        if (errors.length > 0) {
          logger.warn(
            `Invalid frontmatter in ${entry}:\n${errors
              .map((e) => `  ${e.field}: expected ${e.expected}, received ${e.received}`)
              .join('\n')}`
          )
          continue
        }
      }

      const fields = await processFields(entry, content, data, code, collection)

      indexJson.push(fields)
      cache.set(fullPath, fields)
      documentGenerationCount++
    }

    await writeJSON(`${collectionFolderPath}/index.json`, indexJson)
  }

  await generateIndexDts(collections)
  await generateTypesDts(collections)
  await generateIndexMjs(collections)

  return documentGenerationCount
}
