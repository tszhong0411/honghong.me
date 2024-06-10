import type { FlatESLintConfig } from 'eslint-define-config'

import { jsoncPlugin } from '../plugins'

export const jsonc: FlatESLintConfig[] = [
  ...jsoncPlugin.configs['flat/recommended-with-json'],
  {
    rules: {
      'jsonc/sort-keys': 'error'
    }
  }
]
