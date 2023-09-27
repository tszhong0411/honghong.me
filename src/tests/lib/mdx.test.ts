import getAllPosts from '@/lib/mdx'

describe('getAllPosts', () => {
  it('should return an array of blog posts', () => {
    const posts = getAllPosts()

    expect(Array.isArray(posts)).toBe(true)
    expect(posts.length).toBeGreaterThan(0)
  })

  it('should limit the number of returned posts when "limit" is specified', () => {
    const limit = 2
    const posts = getAllPosts({ limit })
    expect(posts.length).toBe(limit)
  })

  it('should return an unsorted array when "sorted" is false', () => {
    const posts = getAllPosts({ sorted: false })
    const dates = posts.map((post) => new Date(post.date))
    for (let i = 0; i < dates.length - 1; i++) {
      // eslint-disable-next-line security/detect-object-injection
      expect(dates[i] <= dates[i + 1]).toBe(true)
    }
  })

  it('should return a sorted array when "sorted" is true', () => {
    const posts = getAllPosts({ sorted: true })
    const dates = posts.map((post) => new Date(post.date))
    for (let i = 0; i < dates.length - 1; i++) {
      // eslint-disable-next-line security/detect-object-injection
      expect(dates[i] >= dates[i + 1]).toBe(true)
    }
  })
})
