import type { Linter } from 'eslint'
import globals from 'globals'

import { eslintPlugin, unusedImportsPlugin } from '../plugins'

export const javascript: Linter.FlatConfig[] = [
  {
    name: 'tszhong0411:javascript',
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        document: 'readonly',
        navigator: 'readonly',
        window: 'readonly'
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: 'module'
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      'unused-imports': unusedImportsPlugin
    },
    rules: {
      ...eslintPlugin.configs.recommended.rules,

      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'error',
        {
          vars: 'all',
          varsIgnorePattern: '^_',
          args: 'after-used',
          argsIgnorePattern: '^_'
        }
      ]
    }
  }
]
