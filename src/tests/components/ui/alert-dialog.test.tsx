import { render, screen } from '@testing-library/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from '@/components/ui'

describe('<AlertDialog />', () => {
  it('should render all children', () => {
    render(
      <AlertDialog defaultOpen>
        <AlertDialogTrigger data-testid='trigger' />
        <AlertDialogContent data-testid='content'>
          <AlertDialogHeader data-testid='header'>
            <AlertDialogTitle data-testid='title' />
            <AlertDialogDescription data-testid='description' />
          </AlertDialogHeader>
          <AlertDialogFooter data-testid='footer'>
            <AlertDialogCancel data-testid='cancel' />
            <AlertDialogAction data-testid='action' />
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    )

    expect(screen.getByTestId('trigger')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('header')).toBeInTheDocument()
    expect(screen.getByTestId('title')).toBeInTheDocument()
    expect(screen.getByTestId('description')).toBeInTheDocument()
    expect(screen.getByTestId('footer')).toBeInTheDocument()
    expect(screen.getByTestId('cancel')).toBeInTheDocument()
    expect(screen.getByTestId('action')).toBeInTheDocument()
  })
})
