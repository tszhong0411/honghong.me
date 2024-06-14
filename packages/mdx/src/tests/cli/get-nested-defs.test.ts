import { describe, expect, it } from 'vitest'

import { getNestedDefs } from '@/cli/get-nested-defs'

describe('getNestedDefs', () => {
  it('should return a list of list field definitions', () => {
    const nestedDefs = getNestedDefs([
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

    expect(nestedDefs).toEqual([
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
