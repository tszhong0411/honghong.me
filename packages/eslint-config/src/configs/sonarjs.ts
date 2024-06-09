import type { FlatESLintConfig } from 'eslint-define-config'

import { sonarjsPlugin } from '../plugins'

export const sonarjs: FlatESLintConfig[] = [
  sonarjsPlugin.configs.recommended as FlatESLintConfig,
  {
    rules: {
      'sonarjs/no-duplicate-string': 'off'
    }
  }
]
