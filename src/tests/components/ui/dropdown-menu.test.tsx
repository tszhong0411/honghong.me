import { render, screen } from '@testing-library/react'

import {
  Button,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from '@/components/ui'

describe('<DropdownMenu />', () => {
  it('should render all children', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuTrigger asChild>
          <Button data-testid='trigger' />
        </DropdownMenuTrigger>
        <DropdownMenuContent data-testid='content'>
          <DropdownMenuLabel data-testid='label' />
          <DropdownMenuSeparator data-testid='separator' />
          <DropdownMenuGroup data-testid='group'>
            <DropdownMenuItem data-testid='item'>
              <DropdownMenuShortcut data-testid='shortcut' />
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem data-testid='checkbox' />
            <DropdownMenuRadioGroup data-testid='radio-group'>
              <DropdownMenuRadioItem data-testid='radio' value='test' />
            </DropdownMenuRadioGroup>
            <DropdownMenuSub open={true}>
              <DropdownMenuSubTrigger data-testid='sub-trigger' />
              <DropdownMenuSubContent data-testid='sub-content'>
                <DropdownMenuItem data-testid='sub-item' />
              </DropdownMenuSubContent>
            </DropdownMenuSub>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.getByTestId('trigger')).toBeInTheDocument()
    expect(screen.getByTestId('content')).toBeInTheDocument()
    expect(screen.getByTestId('label')).toBeInTheDocument()
    expect(screen.getByTestId('separator')).toBeInTheDocument()
    expect(screen.getByTestId('group')).toBeInTheDocument()
    expect(screen.getByTestId('item')).toBeInTheDocument()
    expect(screen.getByTestId('shortcut')).toBeInTheDocument()
    expect(screen.getByTestId('checkbox')).toBeInTheDocument()
    expect(screen.getByTestId('radio-group')).toBeInTheDocument()
    expect(screen.getByTestId('radio')).toBeInTheDocument()
    expect(screen.getByTestId('sub-trigger')).toBeInTheDocument()
    expect(screen.getByTestId('sub-content')).toBeInTheDocument()
    expect(screen.getByTestId('sub-item')).toBeInTheDocument()
  })

  it('should render inset classes', () => {
    render(
      <DropdownMenu defaultOpen>
        <DropdownMenuContent>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger data-testid='sub-trigger' inset />
          </DropdownMenuSub>
          <DropdownMenuItem data-testid='item' inset />
          <DropdownMenuLabel data-testid='label' inset />
        </DropdownMenuContent>
      </DropdownMenu>
    )

    expect(screen.getByTestId('sub-trigger')).toHaveClass('pl-8')
    expect(screen.getByTestId('item')).toHaveClass('pl-8')
    expect(screen.getByTestId('label')).toHaveClass('pl-8')
  })
})
