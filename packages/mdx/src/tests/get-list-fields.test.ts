import { describe, expect, it } from 'vitest'

import { getListFields } from '@/utils/get-list-fields'

describe('getListFields', () => {
  it('should return a list of list field definitions', () => {
    const listFields = getListFields([
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

    expect(listFields).toEqual([
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
