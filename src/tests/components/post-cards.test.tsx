import { fireEvent, screen } from '@testing-library/react'
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

  it('updates mouseX and mouseY on mouse move', () => {
    renderWithSWRConfig(<PostCards posts={posts} />)

    const cards = screen.getByTestId('post-cards')

    fireEvent.mouseMove(cards, {
      clientX: 50,
      clientY: 50
    })

    for (const link of screen.getAllByRole('link')) {
      expect(link).toHaveStyle({
        '--mouse-x': '50px',
        '--mouse-y': '50px'
      })
    }
  })
})
