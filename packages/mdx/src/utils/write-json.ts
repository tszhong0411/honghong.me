import fs from 'node:fs/promises'

export const writeJSON = async (filePath: string, data: unknown) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}
