import type { Options } from '@/index'
import type { Linter } from 'eslint'

import { GLOB_JSX, GLOB_TSX } from '@/globs'

export const tailwindcss = async (options?: Options): Promise<Linter.Config[]> => {
  const { entryPoint, tailwindConfig, ignoreClasses = [] } = options?.tailwindcssConfig ?? {}

  const { default: eslintPluginBetterTailwindcss } = await import(
    'eslint-plugin-better-tailwindcss'
  )

  return [
    {
      name: 'tszhong0411:tailwindcss',
      files: [GLOB_JSX, GLOB_TSX],
      languageOptions: {
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          }
        }
      },
      plugins: {
        'better-tailwindcss': eslintPluginBetterTailwindcss
      },
      rules: {
        'better-tailwindcss/enforce-consistent-variable-syntax': 'error',
        'better-tailwindcss/no-conflicting-classes': 'error',
        'better-tailwindcss/no-unregistered-classes': [
          'error',
          { ignore: ['not-prose', 'toaster', ...ignoreClasses] }
        ]
      },
      settings: {
        'better-tailwindcss': {
          entryPoint,
          tailwindConfig
        }
      }
    }
  ]
}
