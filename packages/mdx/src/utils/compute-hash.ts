import { createHash } from 'node:crypto'

export const computeHash = (content: string): string => {
  return createHash('sha256').update(content).digest('hex')
}
