import matter from 'gray-matter'
import fs from 'node:fs/promises'
import path from 'node:path'

import type { DocumentType } from '@/types'

import { BASE_FOLDER_PATH } from '../constants'
import { getEntries } from '../get-entries'
import { writeJSON } from '../utils'
import { generateIndexDts } from './generate-index-d-ts'
import { generateIndexMjs } from './generate-index-mjs'
import { generateTypesDts } from './generate-types-d-ts'

export const generateData = async (defs: DocumentType[], contentDirPath: string) => {
  for (const def of defs) {
    const entries = await getEntries(def.filePathPattern, contentDirPath)

    const defFolderPath = `${BASE_FOLDER_PATH}/${def.name}`

    const indexJson = []

    await fs.mkdir(defFolderPath, { recursive: true })

    for (const entry of entries) {
      const fullPath = path.join(contentDirPath, entry)
      const fileName = path.basename(entry, '.mdx')
      const fileContent = await fs.readFile(fullPath, 'utf8')

      const parsedContent = matter(fileContent)

      const content = {
        ...parsedContent.data,
        body: parsedContent.content,
        slug: fileName,
        slugAsParams: entry.replace('.mdx', '')
      }

      indexJson.push(content)
    }

    await writeJSON(`${defFolderPath}/index.json`, indexJson)
  }

  await generateIndexDts(defs)
  await generateTypesDts(defs)
  await generateIndexMjs(defs)
}
