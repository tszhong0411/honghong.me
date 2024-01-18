import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import FilteredPosts from '@/components/filtered-posts'

import { allBlogPosts } from '../mocks/contentlayer'

const INPUT_PLACEHOLDER = 'Search articles'

describe('<FilteredPosts />', () => {
  it('should render the search input', () => {
    render(<FilteredPosts posts={allBlogPosts} />)

    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toBeInTheDocument()
  })

  it('should filter posts based on search input', async () => {
    render(<FilteredPosts posts={allBlogPosts} />)

    await userEvent.type(screen.getByPlaceholderText(INPUT_PLACEHOLDER), 'foo')

    expect(screen.getByText('Foo')).toBeInTheDocument()
    expect(screen.queryByText('Bar')).not.toBeInTheDocument()
    expect(screen.queryByText('Qux')).not.toBeInTheDocument()
  })

  it('should display "No posts found" when no matching posts', async () => {
    render(<FilteredPosts posts={allBlogPosts} />)

    await userEvent.type(
      screen.getByPlaceholderText(INPUT_PLACEHOLDER),
      'Non-existent'
    )

    expect(screen.getByText('No posts found')).toBeInTheDocument()
  })
})
