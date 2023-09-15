import { render, screen } from '@testing-library/react'

import {
  Button,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui'

describe('<Dialog />', () => {
  it('should render all children', () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger asChild>
          <Button data-testid='trigger' />
        </DialogTrigger>
        <DialogContent data-testid='content'>
          <DialogHeader data-testid='header'>
            <DialogTitle data-testid='title' />
            <DialogDescription data-testid='description' />
          </DialogHeader>
          <DialogFooter data-testid='footer' />
        </DialogContent>
      </Dialog>
    )

    expect(screen.getByTestId('trigger')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('description')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
  })
})
