import type { FlatESLintConfig } from 'eslint-define-config'

import { prettierConfig, prettierPlugin } from '../plugins'

export const prettier: FlatESLintConfig[] = [
  {
    plugins: {
      prettier: prettierPlugin
    },
    rules: {
      // Avoid conflicts
      ...prettierConfig.rules,

      'prettier/prettier': 'error',
      'arrow-body-style': 'off',
      'prefer-arrow-callback': 'off'
    }
  }
]
