import type { Linter } from 'eslint'

import { simpleImportSortPlugin } from '../plugins'

export const importSort: Linter.FlatConfig[] = [
  {
    name: 'tszhong0411:import-sort',
    plugins: {
      'simple-import-sort': simpleImportSortPlugin
    },
    rules: {
      'simple-import-sort/imports': [
        'error',
        {
          groups: [[String.raw`^@?\w`], [String.raw`^[\w]`], ['^'], [String.raw`^\.`]]
        }
      ],
      'simple-import-sort/exports': 'error'
    }
  }
]
