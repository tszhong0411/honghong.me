import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'

import CopyButton from '@/components/copy-button'
import Toaster from '@/components/toaster'

const BUTTON_LABEL = 'Copy code to clipboard'

describe('<CopyButton />', () => {
  it('should render the copy button', () => {
    render(<CopyButton text='Test Text' />)

    expect(screen.getByLabelText(BUTTON_LABEL)).toBeInTheDocument()
  })

  it('should copy text to clipboard when clicked', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn()
      }
    })

    render(
      <>
        <CopyButton text='Test Text' />
        <Toaster />
      </>
    )

    fireEvent.click(screen.getByLabelText(BUTTON_LABEL))

    await waitFor(() => {
      expect(screen.getByText('Copied')).toBeInTheDocument()
    })
  })

  it('should reset the state after 2 seconds', () => {
    vi.useFakeTimers()

    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn()
      }
    })

    render(<CopyButton text='Test Text' />)

    fireEvent.click(screen.getByLabelText(BUTTON_LABEL))

    act(() => {
      vi.advanceTimersByTime(2000)
    })

    expect(screen.getByTestId('copy')).toBeInTheDocument()

    vi.useRealTimers()
  })

  it('should handle clipboard error', async () => {
    Object.assign(navigator, {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error('Clipboard error'))
      }
    })

    render(
      <>
        <CopyButton text='Test Text' />
        <Toaster />
      </>
    )

    fireEvent.click(screen.getByLabelText(BUTTON_LABEL))

    await waitFor(() => {
      expect(screen.getByText('Failed to copy!')).toBeInTheDocument()
    })
  })

  it('should handle clipboard access rejection', async () => {
    Object.assign(navigator, {
      clipboard: null
    })

    render(
      <>
        <CopyButton text='Test Text' />
        <Toaster />
      </>
    )

    fireEvent.click(screen.getByLabelText(BUTTON_LABEL))

    await waitFor(() => {
      expect(
        screen.getByText('Access to clipboard rejected!')
      ).toBeInTheDocument()
    })
  })
})
