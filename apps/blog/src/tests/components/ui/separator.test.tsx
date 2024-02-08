import { render, screen } from '@testing-library/react'
import { Separator } from '@tszhong0411/ui'

describe('<Separator />', () => {
  it('has a height of 1px when orientation is horizontal', () => {
    render(<Separator orientation='horizontal' />)

    expect(screen.getByRole('none')).toHaveClass('h-px')
  })

  it('has a width of 1px when orientation is vertical', () => {
    render(<Separator orientation='vertical' />)

    expect(screen.getByRole('none')).toHaveClass('w-px')
  })
})
