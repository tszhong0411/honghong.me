import { render, screen } from '@testing-library/react'

import Video from '@/components/mdx/video'

describe('<Video />', () => {
  it('should render video with controls', () => {
    render(
      <Video src='/fake.mp4' width={1280} height={720} data-testid='video' />
    )

    const video = screen.getByTestId('video')

    expect(video).toBeInTheDocument()
    expect(video).toHaveAttribute('controls')
    expect(video).toHaveAttribute('width')
    expect(video).toHaveAttribute('height')
    expect(video).toHaveAttribute('src')
    expect(video).toHaveAttribute('loop')
  })
})
