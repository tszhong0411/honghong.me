import { render } from '@testing-library/react'
import React from 'react'
import { type MockInstance } from 'vitest'

import useGlowPointer from '@/hooks/use-glow-pointer'

describe('useGlowPointer', () => {
  let addEventListenerSpy: MockInstance
  let removeEventListenerSpy: MockInstance
  let setPropertySpy: MockInstance

  beforeEach(() => {
    addEventListenerSpy = vi.spyOn(document.body, 'addEventListener')
    removeEventListenerSpy = vi.spyOn(document.body, 'removeEventListener')
    setPropertySpy = vi.spyOn(document.documentElement.style, 'setProperty')
  })

  afterEach(() => {
    addEventListenerSpy.mockRestore()
    removeEventListenerSpy.mockRestore()
    setPropertySpy.mockRestore()
  })

  it('updates document styles on pointer move', () => {
    render(<TestComponent />)

    const pointerMoveEvent = new MouseEvent('pointermove', {
      clientX: 100,
      clientY: 200
    })
    document.body.dispatchEvent(pointerMoveEvent)

    expect(setPropertySpy).toHaveBeenCalledWith('--x', '100.00')
    expect(setPropertySpy).toHaveBeenCalledWith('--xp', '0.10')
    expect(setPropertySpy).toHaveBeenCalledWith('--y', '200.00')
    expect(setPropertySpy).toHaveBeenCalledWith('--yp', '0.26')
  })

  it('removes event listener on unmount', () => {
    const { unmount } = render(<TestComponent />)
    expect(addEventListenerSpy).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function)
    )

    unmount()
    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      'pointermove',
      expect.any(Function)
    )
  })
})

const TestComponent = () => {
  useGlowPointer()

  return null
}
