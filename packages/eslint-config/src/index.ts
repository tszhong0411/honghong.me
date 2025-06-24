import type { Linter } from 'eslint'

import { isPackageExists } from 'local-pkg'

import { comments } from './configs/comments'
import { ignores } from './configs/ignores'
import { importSort } from './configs/import-sort'
import { imports } from './configs/imports'
import { javascript } from './configs/javascript'
import { next } from './configs/next'
import { playwright } from './configs/playwright'
import { prettier } from './configs/prettier'
import { react } from './configs/react'
import { sonarjs } from './configs/sonarjs'
import { tailwindcss } from './configs/tailwindcss'
import { testingLibrary } from './configs/testing-library'
import { turbo } from './configs/turbo'
import { typescript } from './configs/typescript'
import { unicorn } from './configs/unicorn'

export type Options = {
  typescript?: boolean
  react?: boolean
  turbo?: boolean
  next?: boolean
  playwright?: boolean
  testingLibrary?: boolean
  tailwindcss?: boolean
  gitignore?: boolean

  // TypeScript options
  project?: string
  tsconfigRootDir?: string

  // TailwindCSS options
  tailwindcssConfig?: {
    entryPoint?: string
    tailwindConfig?: string
    ignoreClasses?: string[]
  }
}

export type Configs = Linter.Config[]

const hasTypeScript = isPackageExists('typescript')

const tszhong0411 = async (options: Options = {}, ...userConfigs: Configs): Promise<Configs> => {
  const {
    typescript: enableTypeScript = hasTypeScript,
    react: enableReact = false,
    turbo: enableTurbo = false,
    next: enableNext = false,
    playwright: enablePlaywright = false,
    testingLibrary: enableTestingLibrary = false,
    tailwindcss: enableTailwindcss = false,
    gitignore: enableGitignore = true
  } = options

  const configs: Configs = []

  if (enableGitignore) {
    configs.push((await import('eslint-config-flat-gitignore')).default())
  }

  configs.push(
    ...ignores,
    ...javascript,
    ...unicorn,
    ...comments,
    ...importSort,
    ...sonarjs,
    ...imports,
    ...prettier
  )

  if (enableTypeScript) {
    configs.push(...typescript(options))
  }

  if (enableReact) {
    configs.push(...react(options))
  }

  if (enableTurbo) {
    configs.push(...turbo)
  }

  if (enableNext) {
    configs.push(...next)
  }

  if (enablePlaywright) {
    configs.push(...playwright)
  }

  if (enableTestingLibrary) {
    configs.push(...testingLibrary)
  }

  if (enableTailwindcss) {
    configs.push(...(await tailwindcss(options)))
  }

  configs.push(...userConfigs)

  return configs
}

export * from './globs'

export default tszhong0411
