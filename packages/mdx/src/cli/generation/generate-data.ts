import { bundleMDX } from 'mdx-bundler'
import fs from 'node:fs/promises'
import path from 'node:path'

import { defaultRehypePlugins, defaultRemarkPlugins } from '@/plugins'
import type { MakeSourceOptions } from '@/types'

import { BASE_FOLDER_PATH } from '../constants'
import { getEntries } from '../get-entries'
import { writeJSON } from '../utils'
import { generateIndexDts } from './generate-index-d-ts'
import { generateIndexMjs } from './generate-index-mjs'
import { generateTypesDts } from './generate-types-d-ts'

export const generateData = async (config: MakeSourceOptions) => {
  const { contentDirPath, defs, remarkPlugins = [], rehypePlugins = [] } = config

  for (const def of defs) {
    const entries = await getEntries(def.filePathPattern, contentDirPath)

    const defFolderPath = `${BASE_FOLDER_PATH}/${def.name}`

    const indexJson = []

    await fs.mkdir(defFolderPath, { recursive: true })

    for (const entry of entries) {
      const fullPath = path.join(contentDirPath, entry)
      const fileName = path.basename(entry, '.mdx')
      const fileContent = await fs.readFile(fullPath, 'utf8')

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
        filePath: entry
      }

      const computedFields: Record<string, unknown> = {}

      if (def.computedFields) {
        for (const computedField of def.computedFields) {
          computedFields[computedField.name] = computedField.resolve({
            ...staticFields
          })
        }
      }

      indexJson.push({
        ...staticFields,
        ...computedFields
      })
    }

    await writeJSON(`${defFolderPath}/index.json`, indexJson)
  }

  await generateIndexDts(defs)
  await generateTypesDts(defs)
  await generateIndexMjs(defs)
}
