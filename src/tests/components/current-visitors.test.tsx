import { screen, waitFor } from '@testing-library/react'
import { http } from 'msw'

import CurrentVisitors from '@/components/current-visitors'

import { noCurrentVisitors } from '../mocks/analytics'
import { server } from '../mocks/server'
import { renderWithSWRConfig } from '../utils'

describe('<CurrentVisitors />', () => {
  it('should render loading state', () => {
    renderWithSWRConfig(<CurrentVisitors />)

    expect(screen.getByTestId('skeleton-loader')).toBeInTheDocument()
  })

  it('should render current visitors count', async () => {
    renderWithSWRConfig(<CurrentVisitors />)

    await waitFor(() => {
      expect(screen.getByText('100 current visitors')).toBeInTheDocument()
    })
  })

  it('should not be in plural form when there are no current visitors', async () => {
    server.use(
      http.get('/api/analytics', () =>
        Response.json(noCurrentVisitors, {
          status: 200
        })
      )
    )

    renderWithSWRConfig(<CurrentVisitors />)

    await waitFor(() => {
      expect(screen.getByText('0 current visitor')).toBeInTheDocument()
    })
  })
})
