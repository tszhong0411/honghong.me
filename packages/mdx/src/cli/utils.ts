import fs from 'node:fs/promises'

export const capitalizeFirstChar = (str: string) => {
  if (!str || typeof str !== 'string') return ''
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const writeJSON = async (filePath: string, data: unknown) => {
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), 'utf8')
}
