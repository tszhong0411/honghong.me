/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ['@tszhong0411/eslint-config'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname
  }
}
