import { fireEvent, screen } from '@testing-library/react'
import dayjs from 'dayjs'

import PostCard from '@/components/post-card'

import { allBlogPosts } from '../mocks/contentlayer'
import { renderWithSWRConfig } from '../utils'

const post = { ...allBlogPosts[0], likes: 0, views: 0 }

describe('<PostCard />', () => {
  it('should render the post card', async () => {
    renderWithSWRConfig(<PostCard {...post} />)

    expect(screen.getByText(post.title)).toBeInTheDocument()
    expect(screen.getByText(post.summary)).toBeInTheDocument()

    expect(await screen.findByText(`${post.likes} likes`)).toBeInTheDocument()
    expect(await screen.findByText(`${post.views} views`)).toBeInTheDocument()

    expect(
      await screen.findByText(dayjs(post.date).format('MMMM DD, YYYY'))
    ).toBeInTheDocument()
  })

  it('updates mouseX and mouseY on mouse move', () => {
    renderWithSWRConfig(<PostCard {...post} />)

    const card = screen.getByRole('link')

    card.addEventListener('mousemove', (e) => {
      expect(e.clientX).toBe(50)
      expect(e.clientY).toBe(50)
    })

    fireEvent.mouseMove(card, {
      clientX: 50,
      clientY: 50
    })
  })
})
