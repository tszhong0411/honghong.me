/**
 * Adapted from: https://github.com/mermaid-js/mermaid/blob/7bcba294930aadeaa3960865c26a06ebc7ff907a/scripts/fixCSpell.ts
 */
import fs from 'node:fs'

const cspellDirectory = './.cspell'

const sortWordsInFile = (path: string) => {
  const words = fs
    .readFileSync(path, 'utf8')
    .split('\n')
    .map((word) => word.trim().toLowerCase())
    .filter((word) => word.length > 0)

  words.sort((a, b) => a.localeCompare(b))

  fs.writeFileSync(path, words.join('\n') + '\n', 'utf8')
}

const findDictionaries = () => {
  const files = fs
    .readdirSync(cspellDirectory, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .filter((dirent) => dirent.name.endsWith('.txt'))

  return files.map((file) => `${cspellDirectory}/${file.name}`)
}

const main = () => {
  const dictionaries = findDictionaries()

  for (const dictionary of dictionaries) {
    sortWordsInFile(dictionary)
  }
}

main()
