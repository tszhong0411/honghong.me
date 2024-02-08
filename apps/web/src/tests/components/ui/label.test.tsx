import { render, screen } from '@testing-library/react'
import { Label } from '@tszhong0411/ui'

describe('<Label />', () => {
  it('forwards classes to the label element', () => {
    render(<Label className='test' data-testid='label' />)

    expect(screen.getByTestId('label')).toHaveClass('test')
  })
})
