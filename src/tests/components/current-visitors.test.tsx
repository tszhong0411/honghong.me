import { screen, waitFor } from '@testing-library/react'

import CurrentVisitors from '@/components/current-visitors'

import { renderWithSWRConfig } from '../utils'

describe('<CurrentVisitors />', () => {
  it('should render loading state', () => {
    renderWithSWRConfig(<CurrentVisitors />)

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })

  it('should render current visitors count', async () => {
    renderWithSWRConfig(<CurrentVisitors />)

    await waitFor(() => {
      expect(screen.getByText('0 current visitors')).toBeInTheDocument()
    })
  })
})
