import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import Image from '@/components/mdx/image'

describe('<Image />', () => {
  it('adds and removes effects based on loading state', async () => {
    render(<Image src='/fake.png' width={20} height={20} alt='Fake png' />)

    expect(screen.getByTestId('image-container')).toHaveClass('animate-pulse')

    fireEvent.load(screen.getByRole('img'))

    await waitFor(() => {
      expect(screen.getByTestId('image-container')).not.toHaveClass(
        'animate-pulse'
      )
    })
  })

  it('does not have loading = lazy attribute if lazy = false', () => {
    render(
      <Image
        src='/fake.png'
        width={20}
        height={20}
        alt='Fake png'
        lazy={false}
      />
    )

    expect(screen.getByRole('img')).not.toHaveAttribute('loading')
  })
})
