import { type Config } from 'prettier'

type SortJsonOptions = {
  jsonRecursiveSort?: boolean
  jsonSortOrder?: string
}

const tszhong0411 = (): Config & SortJsonOptions => ({
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
    'prettier-plugin-package-perfection',
    'prettier-plugin-tailwindcss'
  ],
  printWidth: 100,

  // Sort JSON
  jsonRecursiveSort: true
})

export default tszhong0411
