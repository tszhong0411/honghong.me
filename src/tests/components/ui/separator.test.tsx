import { render, screen } from '@testing-library/react'

import { Separator } from '@/components/ui/separator'

describe('<Separator />', () => {
  it('height should be 1px when orientation is horizontal', () => {
    render(<Separator orientation='horizontal' />)

    expect(screen.getByRole('none')).toHaveClass('h-[1px]')
  })

  it('width should be 1px when orientation is vertical', () => {
    render(<Separator orientation='vertical' />)

    expect(screen.getByRole('none')).toHaveClass('w-[1px]')
  })
})
