import { render, screen } from '@testing-library/react'

import Hero from '@/components/hero'
import { HERO_LINKS } from '@/config/links'

describe('<Hero />', () => {
  it('should have five social links', () => {
    render(<Hero />)

    for (const link of HERO_LINKS) {
      expect(screen.getByLabelText(link.label)).toBeInTheDocument()
    }
  })

  it('should have a hero image', () => {
    render(<Hero />)

    expect(screen.getByAltText('Hong')).toBeInTheDocument()
  })

  it('should have a hero title', () => {
    render(<Hero />)

    expect(screen.getByText('Hong')).toBeInTheDocument()
  })
})
