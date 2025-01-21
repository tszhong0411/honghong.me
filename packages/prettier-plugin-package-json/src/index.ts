import type { ParserOptions, Plugin } from 'prettier'
import type { Options, PackageJson } from 'prettier-package-json/build/types'

import { parsers } from 'prettier/plugins/babel'
import { format } from 'prettier-package-json'
import { defaultOptions } from 'prettier-package-json/build/defaultOptions.js'

const parser = parsers['json-stringify']

const plugin: Plugin = {
  parsers: {
    'json-stringify': {
      ...parser,
      preprocess: (text, options: ParserOptions & Options) => {
        const regex = /package.*json$/u

        const formatOptions: Options = {
          useTabs: options.useTabs,
          tabWidth: options.tabWidth,
          expandUsers: options.expandUsers,
          keyOrder: options.keyOrder
        }

        return regex.test(options.filepath)
          ? format(JSON.parse(text) as PackageJson, formatOptions)
          : text
      }
    }
  },
  options: {
    expandUsers: {
      type: 'boolean',
      category: 'Sort Package JSON',
      default: defaultOptions.expandUsers,
      description: 'Expand author and contributors into objects'
    },
    keyOrder: {
      type: 'string',
      array: true,
      category: 'Sort Package JSON',
      default: [{ value: defaultOptions.keyOrder as string[] }],
      description: 'Specify the order of keys.'
    }
  }
}

export { Options }
export default plugin
