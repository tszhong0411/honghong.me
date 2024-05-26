const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  env: {
    node: true,
    browser: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'plugin:eslint-comments/recommended',
    'plugin:jsx-a11y/strict',
    'plugin:tailwindcss/recommended',
    'plugin:sonarjs/recommended',
    'plugin:unicorn/recommended',
    'plugin:prettier/recommended'
  ],
  globals: {
    React: true,
    JSX: true
  },
  ignorePatterns: ['node_modules/', 'dist/', '!.*.*js', '!.*.*ts'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      extends: [
        'plugin:@typescript-eslint/strict',
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/stylistic'
      ],
      plugins: ['@typescript-eslint'],
      parser: '@typescript-eslint/parser',
      rules: {
        '@typescript-eslint/array-type': [2, { default: 'array-simple' }],
        '@typescript-eslint/no-unused-vars': 2,
        '@typescript-eslint/no-empty-function': 2,
        '@typescript-eslint/no-misused-promises': 0,
        '@typescript-eslint/no-namespace': 0,
        '@typescript-eslint/no-invalid-this': [2],
        '@typescript-eslint/no-shadow': [2],
        '@typescript-eslint/no-unsafe-call': 0,
        '@typescript-eslint/no-unsafe-assignment': 0,
        '@typescript-eslint/no-unsafe-member-access': 0,
        '@typescript-eslint/consistent-type-definitions': 0,
        '@typescript-eslint/no-floating-promises': 0,
        '@typescript-eslint/no-non-null-assertion': 0,
        '@typescript-eslint/consistent-type-imports': [
          2,
          {
            prefer: 'type-imports',
            fixStyle: 'inline-type-imports'
          }
        ]
      }
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['react', 'simple-import-sort', 'unused-imports'],
  rules: {
    // Eslint
    quotes: [
      2,
      'single',
      {
        avoidEscape: true
      }
    ],
    semi: [2, 'never'],

    // Eslint comments
    'eslint-comments/disable-enable-pair': 0,
    'eslint-comments/no-aggregating-enable': 0,
    'eslint-comments/no-duplicate-disable': 2,
    'eslint-comments/no-unlimited-disable': 2,
    'eslint-comments/no-unused-disable': 2,
    'eslint-comments/no-unused-enable': 2,
    'eslint-comments/no-use': [
      2,
      {
        allow: [
          'eslint-disable',
          'eslint-enable',
          'eslint-disable-line',
          'eslint-disable-next-line'
        ]
      }
    ],

    // React
    'react/button-has-type': 2,
    'react/no-unescaped-entities': 0,
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/self-closing-comp': [2, { component: true, html: true }],

    // Simple import sort
    'simple-import-sort/exports': 2,
    'simple-import-sort/imports': [
      2,
      {
        groups: [['^@?\\w'], ['^[\\w]'], ['^'], ['^\\.']]
      }
    ],

    // Sonarjs
    'sonarjs/no-duplicate-string': 0,

    // Tailwindcss
    'tailwindcss/no-custom-classname': 0,

    // Unicorn
    'unicorn/no-await-expression-member': 0,
    'unicorn/no-null': 0,
    'unicorn/prefer-export-from': [2, { ignoreUsedVariables: true }],
    'unicorn/prefer-module': 0,
    'unicorn/prevent-abbreviations': 0,

    // Unused imports
    'unused-imports/no-unused-imports': 2,
    'unused-imports/no-unused-vars': [
      2,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ]
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    },
    react: {
      version: 'detect'
    },
    'jsx-a11y': {
      components: {
        Button: 'button',
        Image: 'img',
        Input: 'input',
        Textarea: 'textarea',
        Link: 'a'
      }
    },
    tailwindcss: {
      callees: ['cn', 'cva']
    }
  }
}
