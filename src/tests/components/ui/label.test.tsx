import { render, screen } from '@testing-library/react'

import { Label } from '@/components/ui'

describe('<Label />', () => {
  it('should forward classes to the label element', () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<Label className='test' data-testid='label' />)

    expect(screen.getByTestId('label')).toHaveClass('test')
  })
})
