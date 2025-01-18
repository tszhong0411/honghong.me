import { bundleMDX } from 'mdx-bundler'
import fs from 'node:fs/promises'
import path from 'node:path'

import { BASE_FOLDER_PATH } from '@/constants'
import { defaultRehypePlugins, defaultRemarkPlugins } from '@/plugins'
import type { Config } from '@/types'
import { getEntries } from '@/utils/get-entries'
import { getTOC } from '@/utils/get-toc'
import { writeJSON } from '@/utils/write-json'

import { generateIndexDts } from './generate-index-d-ts'
import { generateIndexMjs } from './generate-index-mjs'
import { generateTypesDts } from './generate-types-d-ts'

export const generateData = async (config: Config) => {
  const { contentDirPath, collections, remarkPlugins = [], rehypePlugins = [], cache } = config

  for (const collection of collections) {
    const entries = await getEntries(collection.filePathPattern, contentDirPath)

    const collectionFolderPath = `${BASE_FOLDER_PATH}/${collection.name}`

    const indexJson = []

    await fs.mkdir(collectionFolderPath, { recursive: true })

    for (const entry of entries) {
      const fullPath = path.join(contentDirPath, entry)
      const fileName = path.basename(entry, '.mdx')
      const fileContent = await fs.readFile(fullPath, 'utf8')

      const cached = cache.get(fullPath)

      if (cached) {
        indexJson.push(cached)
        continue
      }

      const { code, matter } = await bundleMDX({
        source: fileContent,
        mdxOptions: (options) => {
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

          // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- not sure why, but the type is correct
          return options
        }
      })
      const { data, content } = matter

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
          computedFields[computedField.name] = computedField.resolve({
            ...staticFields
          })
        }
      }

      const fields = {
        ...staticFields,
        ...computedFields
      }

      indexJson.push(fields)
      cache.set(fullPath, fields)
    }

    await writeJSON(`${collectionFolderPath}/index.json`, indexJson)
  }

  await generateIndexDts(collections)
  await generateTypesDts(collections)
  await generateIndexMjs(collections)
}
