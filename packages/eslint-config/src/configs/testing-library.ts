import type { FlatESLintConfig } from 'eslint-define-config'

import { GLOB_TEST } from '../globs'
import { testingLibraryPlugin } from '../plugins'

export const testingLibrary: FlatESLintConfig[] = [
  {
    plugins: {
      'testing-library': testingLibraryPlugin
    },
    rules: {
      ...testingLibraryPlugin.configs.react.rules
    },
    files: [GLOB_TEST]
  }
]
