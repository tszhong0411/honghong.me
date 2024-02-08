import path from 'node:path'

import { type BlogMetadata, getAllPages, getPage } from '@/lib/mdx'

describe('getAllPages()', () => {
  it('returns an array of blog posts', () => {
    const posts = getAllPages<BlogMetadata>('blog')

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it('limits the number of returned posts when "limit" is specified', () => {
    const limit = 2
    const posts = getAllPages<BlogMetadata>('blog', { limit })
    expect(posts.length).toBe(limit)
  })
})

describe('getPage()', () => {
  it('returns a blog post', () => {
    const post = getPage<BlogMetadata>('blog/foo')

    expect(post).toHaveProperty('metadata.slug', 'foo')
    expect(post).toHaveProperty('metadata.title', 'Foo')
  })

  it('returns null when the page does not exist', () => {
    const post = getPage<BlogMetadata>('blog/non-existent')

    expect(post).toBeNull()
  })
})

describe('mdxFilesRootDirectory', () => {
  beforeEach(() => {
    vi.resetModules()
  })

  it('should be the content directory when NODE_ENV is not test', async () => {
    vi.stubEnv('NODE_ENV', 'development')

    const mdxFilesRootDirectory = (await import('@/lib/mdx'))
      .mdxFilesRootDirectory

    expect(mdxFilesRootDirectory).toBe(
      path.join(process.cwd(), 'src', 'content')
    )

    vi.unstubAllEnvs()
  })

  it('should be the mock directory when NODE_ENV is test', async () => {
    const mdxFilesRootDirectory = (await import('@/lib/mdx'))
      .mdxFilesRootDirectory

    expect(mdxFilesRootDirectory).toBe(
      path.join(process.cwd(), 'src', 'tests', 'mocks', 'mdx')
    )
  })
})
