import fs from 'node:fs/promises'
import { describe, expect, it, vi } from 'vitest'

import { capitalizeFirstChar, writeJSON } from '@/cli/utils'

vi.mock('node:fs/promises')

describe('capitalizeFirstChar', () => {
  it('should capitalize the first character of a non-empty string', () => {
    expect(capitalizeFirstChar('test')).toBe('Test')
  })

  it('should return an empty string when input is an empty string', () => {
    expect(capitalizeFirstChar('')).toBe('')
  })
})

describe('writeJSON', () => {
  it('should write JSON data to the specified file', async () => {
    const filePath = 'test.json'
    const data = { key: 'value' }

    await writeJSON(filePath, data)

    expect(fs.writeFile).toHaveBeenCalledWith(filePath, JSON.stringify(data, null, 2), 'utf8')
  })

  it('should handle unknown data types', async () => {
    const filePath = 'test.json'
    const data = [1, 2, 3]

    await writeJSON(filePath, data)

    expect(fs.writeFile).toHaveBeenCalledWith(filePath, JSON.stringify(data, null, 2), 'utf8')
  })
})
