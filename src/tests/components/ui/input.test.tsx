import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Input, Label } from '@/components/ui'

describe('<Input />', () => {
  it('should forward classes to the input element', () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<Input className='test' />)

    expect(screen.getByRole('textbox')).toHaveClass('test')
  })

  it('should be able to type in the input', async () => {
    render(<Input />)

    const input = screen.getByRole('textbox')
    await userEvent.type(input, 'test')
    expect(input).toHaveValue('test')
  })

  it('should be able to focus and blur the input', async () => {
    render(<Input />)

    const input = screen.getByRole('textbox')
    await userEvent.click(input)
    expect(input).toHaveFocus()
    await userEvent.tab()
    expect(input).not.toHaveFocus()
  })

  it('should be focused when the label is clicked', async () => {
    render(
      <>
        <Label htmlFor='test'>Test</Label>
        <Input id='test' />
      </>
    )

    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test')
    await userEvent.click(label)
    expect(input).toHaveFocus()
  })
})
