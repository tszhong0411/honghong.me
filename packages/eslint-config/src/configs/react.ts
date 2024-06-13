import type { ESLint, Linter } from 'eslint'

import { GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX } from '../globs'
import type { Options } from '../index'
import { jsxA11yPlugin, reactHooksPlugin, reactPlugin, typescriptParser } from '../plugins'

export const react = (options?: Options): Linter.FlatConfig[] => {
  const plugins = reactPlugin.configs.all.plugins

  return [
    {
      name: 'tszhong0411:react',
      plugins: {
        '@eslint-react': plugins['@eslint-react'] as Record<string, ESLint.Plugin>,
        '@eslint-react/dom': plugins['@eslint-react/dom'] as Record<string, ESLint.Plugin>,
        'react-hooks': reactHooksPlugin,
        '@eslint-react/hooks-extra': plugins['@eslint-react/hooks-extra'] as Record<
          string,
          ESLint.Plugin
        >,
        '@eslint-react/naming-convention': plugins['@eslint-react/naming-convention'] as Record<
          string,
          ESLint.Plugin
        >,
        'jsx-a11y': jsxA11yPlugin
      },
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: typescriptParser,
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          project: options?.project,
          tsconfigRootDir: options?.tsconfigRootDir,
          sourceType: 'module'
        },
        globals: {
          React: true,
          JSX: true
        }
      },
      rules: {
        ...reactPlugin.configs['recommended-type-checked'].rules,
        ...reactPlugin.configs.dom.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        ...jsxA11yPlugin.configs.strict.rules,

        '@eslint-react/dom/no-dangerously-set-innerhtml': 'off',

        'jsx-a11y/alt-text': [
          'error',
          {
            elements: ['img'],
            img: ['Image']
          }
        ]
      },
      settings: {
        'jsx-a11y': {
          components: {
            Button: 'button',
            Image: 'img',
            Input: 'input',
            Textarea: 'textarea',
            Link: 'a'
          }
        }
      }
    }
  ]
}
