import getPage from '@/utils/get-page'

import { allPages } from '../mocks/contentlayer'

vi.mock('next/navigation', () => ({
  notFound: () => 'notFound'
}))

describe('getPage()', () => {
  it('returns a page object by slug', () => {
    const slug = 'foo'
    const page = getPage(slug)

    expect(page).toEqual(allPages.find((p) => p.slug === slug))
  })

  it('returns notFound for an unknown slug', () => {
    const unknownSlug = 'unknown-page'
    const page = getPage(unknownSlug)

    expect(page).toEqual('notFound')
  })
})
