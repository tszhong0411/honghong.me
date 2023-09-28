import { render, screen } from '@testing-library/react'

import LinkCard from '@/components/mdx/link-card'

describe('<LinkCard />', () => {
  it('should render the LinkCard with the provided props', () => {
    render(
      <LinkCard
        href='https://example.com'
        hostname='example.com'
        title='Example Website'
      />
    )

    expect(screen.getByText('Example Website')).toBeInTheDocument()
    expect(screen.getByText('https://example.com')).toBeInTheDocument()
    expect(screen.getByAltText('example.com')).toBeInTheDocument()
    expect(screen.getByAltText('example.com')).toBeInTheDocument()

    expect(screen.getByTestId('external-link-icon')).toBeInTheDocument()
  })
})
