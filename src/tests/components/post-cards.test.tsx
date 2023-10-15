import { screen } from '@testing-library/react'
import dayjs from 'dayjs'

import PostCards from '@/components/post-cards'

import { allBlogPosts } from '../mocks/contentlayer'
import { renderWithSWRConfig } from '../utils'

const posts = allBlogPosts

describe('<PostCard />', () => {
  it('should render the post card', async () => {
    renderWithSWRConfig(<PostCards posts={posts} />)

    for (const post of posts) {
      expect(screen.getByText(post.title)).toBeInTheDocument()
      expect(screen.getByText(post.summary)).toBeInTheDocument()

      expect(
        await screen.findByText(dayjs(post.date).format('MMMM DD, YYYY'))
      ).toBeInTheDocument()
    }

    expect((await screen.findAllByText('0 likes')).length).toBe(posts.length)
    expect((await screen.findAllByText('0 views')).length).toBe(posts.length)
  })
})
