import type { Options as PackageJSONOptions } from '@tszhong0411/prettier-plugin-package-json'
import type { Config } from 'prettier'
import type { PluginOptions as TailwindOptions } from 'prettier-plugin-tailwindcss'

export type Options = Config & TailwindOptions & PackageJSONOptions

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
      '@tszhong0411/prettier-plugin-package-json',
      ...plugins,

      'prettier-plugin-tailwindcss' // must be loaded last
    ],
    printWidth: 100,

    // Tailwind CSS
    tailwindFunctions: ['cn', 'clsx', 'cva', 'tv'],
    ...rest
  }
}

export default tszhong0411
