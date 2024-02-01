import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import FilteredPosts from '@/components/filtered-posts'
import { type BlogMetadata, getAllPages } from '@/lib/mdx'

const INPUT_PLACEHOLDER = 'Search articles'

describe('<FilteredPosts />', () => {
  it('renders the search input', () => {
    const posts = getAllPages<BlogMetadata>('blog')

    render(<FilteredPosts posts={posts} />)

    expect(screen.getByPlaceholderText(INPUT_PLACEHOLDER)).toBeInTheDocument()
  })

  it('filters posts based on search input', async () => {
    const posts = getAllPages<BlogMetadata>('blog')

    render(<FilteredPosts posts={posts} />)

    await userEvent.type(screen.getByPlaceholderText(INPUT_PLACEHOLDER), 'foo')

    expect(screen.getByText('Foo')).toBeInTheDocument()
    expect(screen.queryByText('Bar')).not.toBeInTheDocument()
    expect(screen.queryByText('Qux')).not.toBeInTheDocument()
  })

  it('displays "No posts found" when no matching posts', async () => {
    const posts = getAllPages<BlogMetadata>('blog')

    render(<FilteredPosts posts={posts} />)

    await userEvent.type(
      screen.getByPlaceholderText(INPUT_PLACEHOLDER),
      'Non-existent'
    )

    expect(screen.getByText('No posts found')).toBeInTheDocument()
  })
})
