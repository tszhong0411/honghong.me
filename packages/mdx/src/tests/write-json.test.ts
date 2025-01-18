import { describe, expect, it } from 'vitest'

import { capitalize } from '@/utils/capitalize'

describe('capitalize', () => {
  it('should capitalize the first character of a non-empty string', () => {
    expect(capitalize('test')).toBe('Test')
  })

  it('should return an empty string when input is an empty string', () => {
    expect(capitalize('')).toBe('')
  })
})
