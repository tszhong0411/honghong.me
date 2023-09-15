import { render, screen, waitFor } from '@testing-library/react'

import CurrentVisitors from '@/components/current-visitors'

describe('<CurrentVisitors />', () => {
  it('should render loading state', () => {
    render(<CurrentVisitors />)

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })

  it('should render current visitors count', async () => {
    render(<CurrentVisitors />)

    await waitFor(() => {
      expect(screen.getByText('0 current visitors')).toBeInTheDocument()
    })
  })
})
