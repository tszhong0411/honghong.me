import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { getDocumentsCount } from '@/cli/get-documents-count'

describe('getDocumentsCount', () => {
  it('should return the number of documents in the content directory', async () => {
    const count = await getDocumentsCount(
      path.resolve(import.meta.dirname, '../fixtures/documents')
    )

    expect(count).toBe(4)
  })
})
