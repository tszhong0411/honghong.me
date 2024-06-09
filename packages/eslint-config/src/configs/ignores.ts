import type { FlatESLintConfig } from 'eslint-define-config'

import { GLOB_EXCLUDE } from '../globs'

export const ignores: FlatESLintConfig[] = [{ ignores: GLOB_EXCLUDE }]
