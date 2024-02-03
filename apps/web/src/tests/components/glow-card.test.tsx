import { render, screen } from '@testing-library/react'
import { GlowCard } from '@tszhong0411/ui'

describe('<GlowCard />', () => {
  it('has a container that should be a div element when asChild is false', () => {
    render(<GlowCard />)

    expect(screen.getByTestId('glow-card')).toBeInTheDocument()
    expect(screen.getByTestId('glow-card').tagName).toBe('DIV')
  })

  it('has a container that should be a custom component when asChild is true', () => {
    render(
      <GlowCard asChild>
        <button type='button' />
      </GlowCard>
    )

    expect(screen.getByTestId('glow-card')).toBeInTheDocument()
    expect(screen.getByTestId('glow-card').tagName).toBe('BUTTON')
  })
})
