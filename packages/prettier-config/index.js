/** @type {import('prettier').Config} */
module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  jsxSingleQuote: true,
  tabWidth: 2,
  semi: false,
  trailingComma: 'none',
  endOfLine: 'lf',
  plugins: [
    'prettier-plugin-prisma',
    'prettier-plugin-sort-json',
    'prettier-plugin-package-perfection'
  ]
}
