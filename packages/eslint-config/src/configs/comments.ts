import type { FlatESLintConfig } from 'eslint-define-config'

import { eslintCommentsPlugin } from '../plugins'

export const comments: FlatESLintConfig[] = [
  {
    plugins: {
      'eslint-comments': eslintCommentsPlugin
    },
    rules: {
      ...eslintCommentsPlugin.configs.recommended.rules,

      'eslint-comments/require-description': 'error'
    }
  }
]
