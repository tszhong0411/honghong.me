import { type UserWorkspaceConfig } from 'vitest/config'

export const sharedProjectConfig: UserWorkspaceConfig = {
  test: {
    globals: true,
    environment: 'jsdom',
    include: ['src/tests/**/*.test.{ts,tsx}'],
    exclude: ['**/node_modules/**', '**/e2e/**']
  }
}
