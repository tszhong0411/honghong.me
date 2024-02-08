import { render, screen } from '@testing-library/react'

import Hero from '@/components/home/hero'

describe('<Hero />', () => {
  it('has a hero image', () => {
    render(<Hero />)

    expect(screen.getByAltText('Hong')).toBeInTheDocument()
  })
})
