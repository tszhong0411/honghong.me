import { act, fireEvent, render, screen } from '@testing-library/react'
import toast from 'react-hot-toast'

import Toaster from '@/components/toaster'

beforeEach(() => {
  vi.useFakeTimers()
})

const waitTime = (time: number) => {
  act(() => {
    vi.advanceTimersByTime(time)
  })
}

describe('<Toaster />', () => {
  it('autoclose after 3 seconds', () => {
    render(
      <>
        <button
          type='button'
          onClick={() => {
            toast.success('success')
          }}
        >
          Notify!
        </button>
        <Toaster />
      </>
    )

    fireEvent.click(screen.getByRole('button', { name: /notify/i }))

    expect(screen.getByText(/success/i)).toBeInTheDocument()

    waitTime(3000)

    expect(screen.queryByText(/success/i)).not.toBeInTheDocument()
  })
})
