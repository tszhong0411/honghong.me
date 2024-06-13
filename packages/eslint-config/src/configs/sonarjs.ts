import type { Linter } from 'eslint'

import { sonarjsPlugin } from '../plugins'

export const sonarjs: Linter.FlatConfig[] = [
  {
    name: 'tszhong0411:sonarjs',
    plugins: {
      sonarjs: sonarjsPlugin as unknown as Record<string, unknown>
    },
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,
      'sonarjs/no-duplicate-string': 'off'
    }
  }
]
