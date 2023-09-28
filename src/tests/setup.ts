import '@testing-library/jest-dom'

import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

/**
 * A mock implementation of the ResizeObserver API.
 */
class ResizeObserver {
  /**
   * Observe a target element.
   */
  observe() {
    // do nothing
  }

  /**
   * Stop observing a target element.
   */
  unobserve() {
    // do nothing
  }

  /**
   * Disconnect the ResizeObserver.
   */
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver

/**
 * A mock implementation of the matchMedia API.
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }))
})
