import { cn } from '@tszhong0411/utils'

describe('cn()', () => {
  it('merges class names', () => {
    const classNames = cn('foo', 'bar')

    expect(classNames).toBe('foo bar')
  })

  it('merges class names with tailwind classes', () => {
    const classNames = cn('foo', 'bg-red-500')

    expect(classNames).toBe('foo bg-red-500')
  })

  it('removes conflicting class names', () => {
    // eslint-disable-next-line tailwindcss/no-contradicting-classname
    const classNames = cn('foo', 'bg-red-500', 'bg-red-600')

    expect(classNames).toBe('foo bg-red-600')
  })
})
