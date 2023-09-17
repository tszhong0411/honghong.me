import { render, screen } from '@testing-library/react'
import { userEvent } from '@testing-library/user-event'

import { Label, Textarea } from '@/components/ui'

describe('<Textarea />', () => {
  it('should forward classes to the textarea element', () => {
    // eslint-disable-next-line tailwindcss/no-custom-classname
    render(<Textarea className='test' />)

    expect(screen.getByRole('textbox')).toHaveClass('test')
  })

  it('should be able to type in the textarea', async () => {
    render(<Textarea />)

    const textarea = screen.getByRole('textbox')
    await userEvent.type(textarea, 'test')
    expect(textarea).toHaveValue('test')
  })

  it('should be able to focus and blur the textarea', async () => {
    render(<Textarea />)

    const textarea = screen.getByRole('textbox')
    await userEvent.click(textarea)
    expect(textarea).toHaveFocus()
    await userEvent.tab()
    expect(textarea).not.toHaveFocus()
  })

  it('should be focused when the label is clicked', async () => {
    render(
      <>
        <Label htmlFor='test'>Test</Label>
        <Textarea id='test' />
      </>
    )

    const input = screen.getByRole('textbox')
    const label = screen.getByText('Test')
    await userEvent.click(label)
    expect(input).toHaveFocus()
  })
})
