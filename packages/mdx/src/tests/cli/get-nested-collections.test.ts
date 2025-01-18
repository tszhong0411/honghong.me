import { describe, expect, it } from 'vitest'

import { getNestedCollections } from '@/utils/get-nested-collections'

describe('getNestedCollections', () => {
  it('should return a list of list field definitions', () => {
    const nestedCollections = getNestedCollections([
      {
        name: 'Foo',
        filePathPattern: 'foo/*.mdx',
        fields: [
          {
            name: 'bar',
            type: 'string',
            required: true
          },
          {
            name: 'baz',
            type: 'list',
            fields: [
              {
                name: 'qux',
                type: 'string',
                required: true
              }
            ]
          }
        ]
      }
    ])

    expect(nestedCollections).toEqual([
      {
        name: 'baz',
        type: 'list',
        fields: [
          {
            name: 'qux',
            type: 'string',
            required: true
          }
        ]
      }
    ])
  })
})
