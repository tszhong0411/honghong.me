import type { FlatESLintConfig } from 'eslint-define-config'

import { tailwindcssPlugin } from '../plugins'

export const tailwindcss: FlatESLintConfig[] = [
  ...tailwindcssPlugin.configs['flat/recommended'],
  {
    rules: {
      // Done by Prettier
      'tailwindcss/classnames-order': 'off'
    },
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva']
      }
    }
  }
]
