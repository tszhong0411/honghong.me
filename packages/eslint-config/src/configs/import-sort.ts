import type { FlatESLintConfig } from 'eslint-define-config'

import { simpleImportSortPlugin } from '../plugins'

export const importSort: FlatESLintConfig[] = [
  {
    plugins: {
      'simple-import-sort': simpleImportSortPlugin
    },
    rules: {
      'simple-import-sort/imports': ['error', {
        groups: [[String.raw`^@?\w`], [String.raw`^[\w]`], ['^'], [String.raw`^\.`]]
      }],
      'simple-import-sort/exports': 'error'
    }
  }
]
