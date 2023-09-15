import { render, screen } from '@testing-library/react'

import { Logo } from '@/components/ui'

describe('<Logo />', () => {
  it('should forward classes to the textarea element', () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<Logo className='test' data-testid='logo' />)

    expect(screen.getByTestId('logo')).toHaveClass('test')
  })

  it('should pass the width and height props to the svg element', () => {
    render(<Logo width={100} height={100} data-testid='logo' />)

    expect(screen.getByTestId('logo')).toHaveAttribute('width', '100')
    expect(screen.getByTestId('logo')).toHaveAttribute('height', '100')
  })
})
