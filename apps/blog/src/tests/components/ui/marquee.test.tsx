import { render, screen } from '@testing-library/react'
import { Marquee } from '@tszhong0411/ui'
import React from 'react'

import '@testing-library/jest-dom'

describe('<Marquee />', () => {
  it('renders children and animates horizontally', () => {
    render(
      <Marquee direction='horizontal'>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    expect(screen.getByTestId('marquee')).toBeInTheDocument()
    expect(screen.getByTestId('marquee')).toHaveAttribute(
      'data-direction',
      'horizontal'
    )
  })

  it('renders children and animates vertically', () => {
    render(
      <Marquee direction='vertical'>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    expect(screen.getByTestId('marquee')).toBeInTheDocument()
    expect(screen.getByTestId('marquee')).toHaveAttribute(
      'data-direction',
      'vertical'
    )
  })

  it('pauses the animation on hover', () => {
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

  it('reverses animation when reverse prop is set to true', () => {
    render(
      <Marquee reverse>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    expect(screen.getByTestId('marquee')).toHaveAttribute(
      'data-reverse',
      'true'
    )
  })

  it('renders children and fades with direction horizontally', () => {
    render(
      <Marquee direction='horizontal' fade>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marquee = screen.getByTestId('marquee')
    expect(marquee).toHaveStyle(
      'mask-image:linear-gradient(to right, transparent 0%, rgb(0 0 0) 10%, rgb(0 0 0) 90%, transparent 100%)'
    )
  })

  it('renders children and fades with direction vertically', () => {
    render(
      <Marquee direction='vertical' fade>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Marquee>
    )

    const marquee = screen.getByTestId('marquee')
    expect(marquee).toHaveStyle(
      'mask-image:linear-gradient(to bottom, transparent 0%, rgb(0 0 0) 10%, rgb(0 0 0) 90%, transparent 100%)'
    )
  })
})
