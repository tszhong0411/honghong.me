const GLOB_SRC_EXT = '?([cm])[jt]s?(x)'

export const GLOB_JS = '**/*.?([cm])js'
export const GLOB_JSX = '**/*.?([cm])jsx'

export const GLOB_TS = '**/*.?([cm])ts'
export const GLOB_TSX = '**/*.?([cm])tsx'

export const GLOB_E2E = `**/e2e/**/*.{test,spec}.${GLOB_SRC_EXT}`
export const GLOB_TEST = `**/tests/**/*.{test,spec}.${GLOB_SRC_EXT}`

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',
  '**/package-lock.json',
  '**/yarn.lock',
  '**/pnpm-lock.yaml',
  '**/bun.lockb',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.next',
  '**/.vercel',
  '**/.changeset',
  '**/.cache',

  '**/CHANGELOG*.md',
  '**/LICENSE*'
]
