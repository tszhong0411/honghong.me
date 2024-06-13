import type { Linter } from 'eslint'

import { GLOB_EXCLUDE } from '../globs'

export const ignores: Linter.FlatConfig[] = [
  {
    ignores: GLOB_EXCLUDE
  }
]
