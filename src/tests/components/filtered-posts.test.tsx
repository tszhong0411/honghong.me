import { fireEvent, render, screen } from '@testing-library/react'

import FilteredPosts from '@/components/filtered-posts'

import { allBlogPosts } from '../mocks/contentlayer'

const INPUT_PLACEHOLDER = 'Search articles'

describe('<FilteredPosts />', () => {
  it('should render the search input', () => {
    render(<FilteredPosts posts={allBlogPosts} />)

    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toBeInTheDocument()
  })

  it('should filter posts based on search input', () => {
    render(<FilteredPosts posts={allBlogPosts} />)

    fireEvent.change(screen.getByPlaceholderText(INPUT_PLACEHOLDER), {
      target: { value: 'foo' }
    })

    expect(screen.getByText('Foo')).toBeInTheDocument()
    expect(screen.queryByText('Bar')).not.toBeInTheDocument()
    expect(screen.queryByText('Qux')).not.toBeInTheDocument()
  })

  it('should display "No posts found" when no matching posts', () => {
    render(<FilteredPosts posts={allBlogPosts} />)

    fireEvent.change(screen.getByPlaceholderText(INPUT_PLACEHOLDER), {
      target: { value: 'Non-existent' }
    })

    expect(screen.getByText('No posts found')).toBeInTheDocument()
  })
})
