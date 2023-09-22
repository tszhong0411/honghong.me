import cn from '@/utils/cn'

describe('cn()', () => {
  it('should merge class names', () => {
    const classNames = cn('foo', 'bar')

    expect(classNames).toBe('foo bar')
  })

  it('should merge class names with tailwind classes', () => {
    const classNames = cn('foo', 'bg-red-500')

    expect(classNames).toBe('foo bg-red-500')
  })

  it('should remove conflicting class names', () => {
    const classNames = cn('foo', 'bg-red-500', 'bg-red-600')

    expect(classNames).toBe('foo bg-red-600')
  })
})
