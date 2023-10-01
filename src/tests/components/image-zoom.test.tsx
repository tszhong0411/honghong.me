import { render, screen } from '@testing-library/react'
import Image from 'next/image'

import ImageZoom from '@/components/image-zoom'

describe('<ImageZoom />', () => {
  it('renders children', () => {
    render(
      <ImageZoom>
        <Image src='/fake.png' width={20} height={20} alt='Fake image' />
      </ImageZoom>
    )

    expect(screen.getByRole('img')).toBeInTheDocument()
  })
})
