/**
 * mermaid (MIT License)
 * Copyright (c) Knut Sveidqvist
 * Source: https://github.com/mermaid-js/mermaid/blob/7bcba294930aadeaa3960865c26a06ebc7ff907a/scripts/fixCSpell.ts
 *
 * Modified by: tszhong0411
 */
import fs from 'node:fs/promises'

const cspellDirectory = './.cspell'

const sortWordsInFile = async (path: string) => {
  const words = await fs.readFile(path, 'utf8')
  const sortedWords = words
    .split('\n')
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 0)
    .sort((a, b) => a.localeCompare(b))

  await fs.writeFile(path, sortedWords.join('\n') + '\n', 'utf8')
}

const findDictionaries = async () => {
  const directory = await fs.readdir(cspellDirectory, { withFileTypes: true })

  const files = directory
    .filter((dirent) => dirent.isFile())
    .filter((dirent) => dirent.name.endsWith('.txt'))

  return files.map((file) => `${cspellDirectory}/${file.name}`)
}

const main = async () => {
  const dictionaries = await findDictionaries()

  for (const dictionary of dictionaries) {
    await sortWordsInFile(dictionary)
  }
}

await main()
