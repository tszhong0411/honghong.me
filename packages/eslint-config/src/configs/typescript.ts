import type { FlatESLintConfig } from 'eslint-define-config'

import { GLOB_TS, GLOB_TSX } from '../globs'
import type { Options } from '../index'
import { typescriptParser, typescriptPlugin } from '../plugins'

export const typescript = (options?: Options): FlatESLintConfig[] => [
  {
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
      ...typescriptPlugin.configs['strict-type-checked']!.rules,
      ...typescriptPlugin.configs['stylistic-type-checked']!.rules,

      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-empty-function': 'error',
      // '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-invalid-this': ['error'],
      '@typescript-eslint/no-shadow': ['error'],
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      // '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/consistent-type-imports': [
        'error',
        {
          prefer: 'type-imports',
          fixStyle: 'inline-type-imports'
        }
      ],
      '@typescript-eslint/restrict-template-expressions': ['error', { allowNumber: true }]
    }
  }
]
