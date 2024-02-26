const { resolve } = require('node:path')

const project = resolve(process.cwd(), 'tsconfig.json')

/** @type {import("eslint").Linter.Config} */
module.exports = {
  extends: [
    'eslint:recommended',
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
  env: {
    node: true,
    browser: true
  },
  settings: {
    'import/resolver': {
      typescript: {
        project
      }
    },
    react: {
      pragma: 'React',
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
  },
  plugins: ['react', 'simple-import-sort', 'unused-imports'],
  parserOptions: {
    project,
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['node_modules/', 'dist/'],
  overrides: [
    {
      files: [
        '*.js',
        '*.jsx',
        '*.ts',
        '*.tsx',
        '*.cjs',
        '*.mjs',
        '*.mts',
        '*.cts'
      ],
      rules: {
        'simple-import-sort/imports': [
          2,
          {
            groups: [['^@?\\w'], ['^[\\w]'], ['^'], ['^\\.']]
          }
        ]
      }
    },
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
        '@typescript-eslint/consistent-type-definitions': [2, 'type'],
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

    // Import sorting
    'simple-import-sort/imports': 2,
    'simple-import-sort/exports': 2,

    // Unicorn
    'unicorn/prevent-abbreviations': 0,
    'unicorn/no-null': 0,
    'unicorn/no-await-expression-member': 0,
    'unicorn/prefer-export-from': [2, { ignoreUsedVariables: true }],

    // SonarJS
    'sonarjs/no-duplicate-string': [2, { threshold: 5 }],

    // Eslint comments
    'eslint-comments/no-use': [
      2,
      {
        allow: [
          'eslint-disable',
          'eslint-disable-line',
          'eslint-disable-next-line'
        ]
      }
    ],
    'eslint-comments/disable-enable-pair': 0,
    'eslint-comments/no-aggregating-enable': 0,
    'eslint-comments/no-duplicate-disable': 2,
    'eslint-comments/no-unlimited-disable': 2,
    'eslint-comments/no-unused-disable': 2,
    'eslint-comments/no-unused-enable': 2,

    // React
    'react/prop-types': 0,
    'react/react-in-jsx-scope': 0,
    'react/button-has-type': 2,
    'react/self-closing-comp': [2, { component: true, html: true }],
    'react/no-unescaped-entities': 0,

    // Unused import
    'unused-imports/no-unused-imports': 2,
    'unused-imports/no-unused-vars': [
      2,
      {
        vars: 'all',
        varsIgnorePattern: '^_',
        args: 'after-used',
        argsIgnorePattern: '^_'
      }
    ],

    // Tailwindcss
    'tailwindcss/no-custom-classname': 0
  }
}
