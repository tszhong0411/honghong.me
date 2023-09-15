import { render, screen } from '@testing-library/react'

import Footer from '@/components/footer'
import { FOOTER_LINKS } from '@/config/links'

describe('<Footer />', () => {
  it('should have all footer links', () => {
    render(<Footer />)

    for (const { title, href } of FOOTER_LINKS.flatMap((l) => l.links)) {
      expect(screen.getByRole('link', { name: title })).toHaveAttribute(
        'href',
        href
      )
    }
  })

  it('should have <NowPlaying />', () => {
    render(<Footer />)

    expect(screen.getByText('Loading ...')).toBeInTheDocument()
  })

  it('should render <CurrentVisitors /> when NODE_ENV = production', () => {
    vi.stubEnv('NODE_ENV', 'production')
    render(<Footer />)

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })
})
