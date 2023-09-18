import '@testing-library/jest-dom'

import { server } from './mocks/server'

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

/**
 * A mock implementation of the ResizeObserver API.
 * @class
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
