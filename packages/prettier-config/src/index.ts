import { type Config } from 'prettier'
import { type PluginOptions } from 'prettier-plugin-tailwindcss'

type SortJsonOptions = {
  jsonRecursiveSort?: boolean
  jsonSortOrder?: string
}

type Options = Config & SortJsonOptions & PluginOptions

const tszhong0411 = (options: Options = {}): Options => {
  const { plugins = [], ...rest } = options

  return {
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
      ...plugins,

      'prettier-plugin-tailwindcss' // must be loaded last
    ],
    printWidth: 100,

    // Sort JSON
    jsonRecursiveSort: true,

    // Tailwind CSS
    tailwindFunctions: ['cn', 'clsx', 'cva'],

    ...rest
  }
}

export default tszhong0411
