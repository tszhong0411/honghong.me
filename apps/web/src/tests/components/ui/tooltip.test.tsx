import { act, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@tszhong0411/ui'

describe('<Tooltip />', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('renders and displays tooltip', async () => {
    render(
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>foo</TooltipTrigger>
          <TooltipContent>
            <p>Foo</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    )

    await userEvent.hover(screen.getByText('foo'))

    act(() => {
      vi.runAllTimers()
    })

    for (const el of screen.getAllByText('Foo')) {
      expect(el).toBeInTheDocument()
    }
  })
})
