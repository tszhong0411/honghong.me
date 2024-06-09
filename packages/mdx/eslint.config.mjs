import tszhong0411 from '@tszhong0411/eslint-config'

export default tszhong0411({
  project: './tsconfig.json',
  tsconfigRootDir: import.meta.dirname,
  react: true
}, {
  files: ['src/core/plugins/**/*.ts'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-unsafe-argument': 'off'
  }
})
