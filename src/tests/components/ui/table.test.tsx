import { render, screen } from '@testing-library/react'

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui'

describe('<Table />', () => {
  it('should render all children', () => {
    render(
      <Table>
        <TableCaption data-testid='caption' />
        <TableHeader data-testid='header'>
          <TableRow data-testid='row'>
            <TableHead data-testid='head' />
          </TableRow>
        </TableHeader>
        <TableBody data-testid='body'>
          <TableRow>
            <TableCell data-testid='cell' />
          </TableRow>
        </TableBody>
        <TableFooter data-testid='footer' />
      </Table>
    )

    expect(screen.getByTestId('caption')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('row')).toBeInTheDocument()
    expect(screen.getByTestId('head')).toBeInTheDocument()
    expect(screen.getByTestId('body')).toBeInTheDocument()
    expect(screen.getByTestId('cell')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
