import { screen } from '@testing-library/react'
import { dayjs } from '@tszhong0411/utils'

import PostCards from '@/components/post-cards'
import { type BlogMetadata, getAllPages } from '@/lib/mdx'

import { renderWithSWRConfig } from '../utils'

describe('<PostCard />', () => {
  it('renders the post card', async () => {
    const posts = getAllPages<BlogMetadata>('blog')

    renderWithSWRConfig(<PostCards posts={posts} />)

    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
      expect(screen.getByText(post.summary)).toBeInTheDocument()

      expect(
        await screen.findByText(dayjs(post.date).format('LL'))
      ).toBeInTheDocument()
    }

    expect((await screen.findAllByText('0 likes')).length).toBe(posts.length)
    expect((await screen.findAllByText('0 views')).length).toBe(posts.length)
  })
})
