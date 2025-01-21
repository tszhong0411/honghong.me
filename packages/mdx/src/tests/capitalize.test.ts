import fs from 'node:fs/promises'

import { describe, expect, it, vi } from 'vitest'

import { writeJSON } from '@/utils/write-json'

vi.mock('node:fs/promises')

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
