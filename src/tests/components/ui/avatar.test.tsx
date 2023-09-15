import { render, screen } from '@testing-library/react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui'

describe('<Avatar />', () => {
  it('should render the fallback', () => {
    render(
      <Avatar>
        <AvatarImage src='/fake.png' />
        <AvatarFallback>FAKE</AvatarFallback>
      </Avatar>
    )

    expect(screen.getByText('FAKE')).toBeInTheDocument()
  })
})
