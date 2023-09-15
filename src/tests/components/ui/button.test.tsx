import { render, screen } from '@testing-library/react'

import { Button, buttonVariants } from '@/components/ui'

describe('<Button />', () => {
  it('should forward classes to the button element', () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<Button className='test' />)

    expect(screen.getByRole('button')).toHaveClass('test')
  })

  it('asChild function should run as expected', () => {
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
