import { render, screen } from '@testing-library/react'

import { Button, buttonVariants } from '@/components/ui'

describe('<Button />', () => {
  it('forwards classes to the button element', () => {
    render(<Button className='test' />)

    expect(screen.getByRole('button')).toHaveClass('test')
  })

  it('composes button with child component', () => {
    render(
      <Button asChild>
        <a href='/test'>Test</a>
      </Button>
    )

    const link = screen.getByRole('link', { name: 'Test' })

    expect(link).toBeInTheDocument()
    expect(link).toHaveClass(buttonVariants())
  })
})
