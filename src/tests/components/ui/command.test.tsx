import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut
} from '@/components/ui'

describe('<Command />', () => {
  it('should render all children', () => {
    render(
      <Command data-testid='command'>
        <CommandInput data-testid='input' />
        <CommandList data-testid='list'>
          <CommandGroup data-testid='group'>
            <CommandItem data-testid='item'>
              <CommandShortcut data-testid='shortcut' />
            </CommandItem>
          </CommandGroup>
          <CommandSeparator data-testid='separator' />
        </CommandList>
      </Command>
    )

    expect(screen.getByTestId('command')).toBeInTheDocument()
    expect(screen.getByTestId('input')).toBeInTheDocument()
    expect(screen.getByTestId('list')).toBeInTheDocument()
    expect(screen.getByTestId('group')).toBeInTheDocument()
    expect(screen.getByTestId('item')).toBeInTheDocument()
    expect(screen.getByTestId('shortcut')).toBeInTheDocument()
    expect(screen.getByTestId('separator')).toBeInTheDocument()
  })

  it('should render command dialog', () => {
    render(<CommandDialog defaultOpen />)

    expect(screen.getByRole('dialog')).toBeInTheDocument()
  })

  it('should render empty message when no results found', async () => {
    render(
      <Command>
        <CommandInput />
        <CommandList>
          <CommandEmpty data-testid='empty' />
          <CommandItem>demo</CommandItem>
        </CommandList>
      </Command>
    )

    const input = screen.getByRole('combobox')
    await userEvent.type(input, 'test')
    expect(input).toHaveValue('test')

    expect(screen.getByTestId('empty')).toBeInTheDocument()
  })
})
