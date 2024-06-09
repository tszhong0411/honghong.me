import type { FlatESLintConfig } from 'eslint-define-config'

import { tailwindcssPlugin } from '../plugins'

export const tailwindcss: FlatESLintConfig[] = [
  ...tailwindcssPlugin.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        callees: ['cn', 'cva']
      }
    }
  }
]
