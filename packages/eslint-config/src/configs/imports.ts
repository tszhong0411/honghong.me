import type { FlatESLintConfig } from 'eslint-define-config'

import { importPlugin } from '../plugins'

export const imports: FlatESLintConfig[] = [
  {
    plugins: {
      import: importPlugin as unknown as Record<string, unknown>
    },
    rules: {
      'import/no-commonjs': 'error',
      'import/first': 'error',
      'import/no-duplicates': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-default': 'error',
      'import/no-self-import': 'error',
      'import/no-webpack-loader-syntax': 'error',
      'import/newline-after-import': ['error', { count: 1 }]
    }
  }
]
