import { render, screen } from '@testing-library/react'

import GlowCard from '@/components/glow-card'

describe('<GlowCard />', () => {
  it('container should be a div when asChild not equal true', () => {
    render(<GlowCard />)

    expect(screen.getByTestId('glow-card')).toBeInTheDocument()
    expect(screen.getByTestId('glow-card').tagName).toBe('DIV')
  })

  it('container should be a custom component when asChild equal true', () => {
    render(
      <GlowCard asChild>
        <button type='button' />
      </GlowCard>
    )

    expect(screen.getByTestId('glow-card')).toBeInTheDocument()
    expect(screen.getByTestId('glow-card').tagName).toBe('BUTTON')
  })
})
