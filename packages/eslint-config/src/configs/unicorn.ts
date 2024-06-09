import type { FlatESLintConfig } from 'eslint-define-config'

import { unicornPlugin } from '../plugins'

export const unicorn: FlatESLintConfig[] = [
  unicornPlugin.configs['flat/recommended'],
  {
    rules: {
      'unicorn/no-await-expression-member': 'off',
      'unicorn/no-null': 'off',
      'unicorn/prefer-export-from': ['error', { ignoreUsedVariables: true }],
      'unicorn/prevent-abbreviations': 'off'
    }
  }
]
