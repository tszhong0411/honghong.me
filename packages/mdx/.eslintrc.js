/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@tszhong0411/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  },
  overrides: [
    {
      files: ['./src/plugins/**/*.ts'],
      rules: {
        '@typescript-eslint/no-explicit-any': 0,
        '@typescript-eslint/no-unsafe-argument': 0
      }
    }
  ]
}
