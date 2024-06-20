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
          sourceType: 'module'
        }
      },
      rules: {
        ...reactPlugin.configs['recommended-type-checked'].rules,
        ...reactPlugin.configs.dom.rules,
        ...reactHooksPlugin.configs.recommended.rules,
        ...jsxA11yPlugin.configs.strict.rules,

        // @eslint-react
        '@eslint-react/no-missing-component-display-name': 'error',
        '@eslint-react/no-class-component': 'error',
        // @eslint-react/dom
        '@eslint-react/dom/no-dangerously-set-innerhtml': 'off',
        // @eslint-react/hooks-extra
        '@eslint-react/hooks-extra/ensure-custom-hooks-using-other-hooks': 'error',
        '@eslint-react/hooks-extra/prefer-use-state-lazy-initialization': 'error',
        // @eslint-react/naming-convention
        '@eslint-react/naming-convention/component-name': 'error',
        '@eslint-react/naming-convention/filename': [
          'error',
          {
            rule: 'kebab-case'
          }
        ],
        '@eslint-react/naming-convention/use-state': 'error',
        // jsx-a11y
        'jsx-a11y/alt-text': [
          'error',
          {
            elements: ['img'],
            img: ['Image']
          }
        ],
        'jsx-a11y/lang': 'error'
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
