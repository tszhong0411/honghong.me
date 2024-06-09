import type { FlatESLintConfig } from 'eslint-define-config'

import { nextPlugin } from '../plugins'

export const next: FlatESLintConfig[] = [
  {
    plugins: {
      '@next/next': nextPlugin
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules
    }
  }
]
