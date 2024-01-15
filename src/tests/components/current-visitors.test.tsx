import { screen, waitFor } from '@testing-library/react'
import { http } from 'msw'

import CurrentVisitors from '@/components/current-visitors'

import { oneCurrentVisitor } from '../mocks/analytics'
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

  it('should not be in plural form when there is only one current visitor', async () => {
    server.use(
      http.get('/api/analytics', () =>
        Response.json(oneCurrentVisitor, {
          status: 200
        })
      )
    )

    renderWithSWRConfig(<CurrentVisitors />)

    await waitFor(() => {
      expect(screen.getByText('1 current visitor')).toBeInTheDocument()
    })
  })
})
