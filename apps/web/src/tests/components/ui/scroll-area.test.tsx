import { render, screen } from '@testing-library/react'
import { ScrollArea, ScrollBar } from '@tszhong0411/ui'

import { queryByAttr } from '@/tests/utils'

describe('<ScrollArea />', () => {
  it('renders all children', () => {
    const { container } = render(<ScrollArea data-testid='scroll-area' />)

    expect(screen.getByTestId('scroll-area')).toBeInTheDocument()
    expect(
      queryByAttr('data-radix-scroll-area-viewport')(container, '')
    ).toHaveStyle({
      'overflow-x': 'hidden',
      'overflow-y': 'scroll'
    })
  })

  it('renders horizontal scrollbar', () => {
    const { container } = render(
      <ScrollArea>
        <ScrollBar
          orientation='horizontal'
          data-testid='horizontal-scroll-bar'
        />
      </ScrollArea>
    )

    expect(
      queryByAttr('data-radix-scroll-area-viewport')(container, '')
    ).toHaveStyle({
      'overflow-x': 'scroll',
      'overflow-y': 'scroll'
    })
  })
})
