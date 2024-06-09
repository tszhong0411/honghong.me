import type { FlatESLintConfig } from 'eslint-define-config'

import { turboPlugin } from '../plugins'

export const turbo: FlatESLintConfig[] = [
  {
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      ...turboPlugin.configs.recommended.rules
    }
  }
]
