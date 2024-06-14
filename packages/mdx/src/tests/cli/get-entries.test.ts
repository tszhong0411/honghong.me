import path from 'node:path'
import { describe, expect, it } from 'vitest'

import { getEntries } from '@/cli/get-entries'

describe('getEntries', () => {
  it('should return a list of file paths that match the given pattern', async () => {
    const entries = await getEntries(
      'nested/*.mdx',
      path.resolve(import.meta.dirname, '../fixtures/documents')
    )

    expect(entries).toEqual(['nested/baz.mdx', 'nested/qux.mdx'])
  })
})
