import type { FlatESLintConfig } from 'eslint-define-config'

import { GLOB_E2E } from '../globs'
import { playwrightPlugin } from '../plugins'

export const playwright: FlatESLintConfig[] = [
  {
    ...playwrightPlugin.configs['flat/recommended'],
    files: [GLOB_E2E]
  }
]
