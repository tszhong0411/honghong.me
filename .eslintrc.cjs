/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ['apps/**', 'packages/**'],
  extends: ['@tszhong0411/eslint-config', 'plugin:turbo/recommended'],
  parserOptions: {
    project: true
  }
}
