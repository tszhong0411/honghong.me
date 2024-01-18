import { render, screen } from '@testing-library/react'
import React from 'react'

import '@testing-library/jest-dom'
import { Marquee } from '@/components/ui'

describe('<Marquee />', () => {
  it('should render children and animates left', () => {
    render(
      <Marquee direction='left'>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marqueeChild1 = screen.getByTestId('marquee-child-1')
    const marqueeChild2 = screen.getByTestId('marquee-child-2')
    expect(marqueeChild1).toHaveClass('animate-marquee-left')
    expect(marqueeChild2).toHaveClass('animate-marquee-left')
  })

  it('should render children and animates up', () => {
    render(
      <Marquee direction='up'>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marqueeChild1 = screen.getByTestId('marquee-child-1')
    const marqueeChild2 = screen.getByTestId('marquee-child-2')
    expect(marqueeChild1).toHaveClass('animate-marquee-up')
    expect(marqueeChild2).toHaveClass('animate-marquee-up')
  })

  it('should pause the animation on hover', () => {
    render(
      <Marquee pauseOnHover>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marqueeChild1 = screen.getByTestId('marquee-child-1')
    const marqueeChild2 = screen.getByTestId('marquee-child-2')
    expect(marqueeChild1).toHaveClass(
      'group-hover:[animation-play-state:paused]'
    )
    expect(marqueeChild2).toHaveClass(
      'group-hover:[animation-play-state:paused]'
    )
  })

  it('should reverse animation when reverse prop is set to true', () => {
    render(
      <Marquee reverse>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marqueeChild1 = screen.getByTestId('marquee-child-1')
    const marqueeChild2 = screen.getByTestId('marquee-child-2')
    expect(marqueeChild1).toHaveClass('direction-reverse')
    expect(marqueeChild2).toHaveClass('direction-reverse')
  })

  it('should render children and fades with direction left', () => {
    render(
      <Marquee direction='left' fade>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marquee = screen.getByTestId('marquee')
    expect(marquee).toHaveStyle(
      'mask-image:linear-gradient(to right, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)'
    )
  })

  it('should render children and fades with direction up', () => {
    render(
      <Marquee direction='up' fade>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marquee = screen.getByTestId('marquee')
    expect(marquee).toHaveStyle(
      'mask-image:linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 1.0) 10%, rgba(0, 0, 0, 1.0) 90%, transparent 100%)'
    )
  })
})
