import '@testing-library/jest-dom'

import { server } from './mocks/server'

beforeAll(() => {
  vi.stubEnv('NEXT_PUBLIC_GISCUS_REPO', 'test')
  vi.stubEnv('NEXT_PUBLIC_GISCUS_REPOSITORY_ID', 'test')
  vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY', 'test')
  vi.stubEnv('NEXT_PUBLIC_GISCUS_CATEGORY_ID', 'test')
  vi.stubEnv('NEXT_PUBLIC_UMAMI_URL', 'http://test')
  vi.stubEnv(
    'NEXT_PUBLIC_UMAMI_WEBSITE_ID',
    '00000000-0000-0000-0000-000000000000'
  )
  vi.stubEnv('NEXT_PUBLIC_UMAMI_WEBSITE_SHARE_URL', 'http://test')

  server.listen()
})
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

// Mock ResizeObserver
class ResizeObserver {
  observe() {
    // do nothing
  }
  unobserve() {
    // do nothing
  }
  disconnect() {
    // do nothing
  }
}

window.ResizeObserver = ResizeObserver
