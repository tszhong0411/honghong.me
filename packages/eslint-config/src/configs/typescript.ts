import type { Linter } from 'eslint'

import { GLOB_TS, GLOB_TSX } from '../globs'
import type { Options } from '../index'
import { typescriptParser, typescriptPlugin } from '../plugins'

export const typescript = (options?: Options): Linter.FlatConfig[] => [
  {
    name: 'tszhong0411:typescript',
    plugins: {
      '@typescript-eslint': typescriptPlugin as unknown as Record<string, unknown>
    },
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: options?.project,
        tsconfigRootDir: options?.tsconfigRootDir,
        sourceType: 'module'
      }
    },
    rules: {
      ...typescriptPlugin.configs['recommended-type-checked']!.rules,
      ...typescriptPlugin.configs['strict-type-checked']!.rules,
      ...typescriptPlugin.configs['stylistic-type-checked']!.rules,
      ...typescriptPlugin.configs['eslint-recommended']!.overrides![0]!.rules!,

      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-invalid-this': 'error',
      '@typescript-eslint/no-shadow': 'error',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }],

      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',

      // Turn off due to poor performance
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off'
    }
  }
]
