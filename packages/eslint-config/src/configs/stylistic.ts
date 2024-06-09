import type { FlatESLintConfig } from 'eslint-define-config'

import { stylisticPlugin } from '../plugins'

const config = stylisticPlugin.configs.customize({
  flat: true,
  arrowParens: true,
  jsx: true,
  indent: 2,
  quotes: 'single',
  semi: false,
  pluginName: '@stylistic',
  commaDangle: 'never',
  quoteProps: 'as-needed',
  braceStyle: '1tbs'
})

export const stylistic: FlatESLintConfig[] = [
  {
    plugins: {
      '@stylistic': stylisticPlugin as unknown as Record<string, unknown>
    },
    rules: {
      ...config.rules,
      '@stylistic/jsx-quotes': ['error', 'prefer-single'],
      '@stylistic/jsx-one-expression-per-line': ['error', { allow: 'single-line' }]
    }
  }
]
