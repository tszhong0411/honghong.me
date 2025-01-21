import type { Linter } from 'eslint'

import { simpleImportSortPlugin } from '@/plugins'

export const importSort: Linter.Config[] = [
  {
    name: 'tszhong0411:import-sort',
    plugins: {
      'simple-import-sort': simpleImportSortPlugin
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            // Type imports
            [
              '^.*\\u0000$',
              '^node:.*\\u0000$',
              '^@?\\w.*\\u0000$',
              '^\\.\\..*\\u0000$',
              '^\\..*\\u0000$'
            ],

            // Side effect imports (e.g., `import 'some-module'`)
            ['^\\u0000'],

            // Node.js builtins prefixed with `node:`
            ['^node:'],

            // Things that start with a letter (or digit or underscore), or `@` followed by a letter
            ['^@?\\w'],

            // Absolute imports (e.g., `import something from 'src/utils'`)
            ['^[^.]'],

            // Parent directory relative imports (e.g., `import something from '../utils'`)
            ['^\\.\\.'],

            // Current directory relative imports (e.g., `import something from './utils'`)
            ['^\\.']
          ]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  }
]
