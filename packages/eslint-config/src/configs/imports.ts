import type { Linter } from 'eslint'

import { importPlugin } from '../plugins'

export const imports: Linter.FlatConfig[] = [
  {
    name: 'tszhong0411:imports',
    plugins: {
      import: importPlugin as unknown as Record<string, unknown>
    },
    rules: {
      'import/no-amd': 'error',
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
