import { render, screen } from '@testing-library/react'

import Hero from '@/components/home/hero'

describe('<Hero />', () => {
  it('should have a hero image', () => {
    render(<Hero />)

    expect(screen.getByAltText('Hong')).toBeInTheDocument()
  })
})
