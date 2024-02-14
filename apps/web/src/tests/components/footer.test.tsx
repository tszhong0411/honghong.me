import { render, screen } from '@testing-library/react'

import Footer from '@/components/footer'
import { FOOTER_LINKS } from '@/config/links'

describe('<Footer />', () => {
  it('has all footer links', () => {
    render(<Footer />)

    for (const { text, href } of FOOTER_LINKS.flatMap((l) => l.links)) {
      expect(screen.getByRole('link', { name: text })).toHaveAttribute(
        'href',
        href
      )
    }
  })

  it('has <NowPlaying />', () => {
    render(<Footer />)

    expect(screen.getByText('Loading ...')).toBeInTheDocument()
  })
})
