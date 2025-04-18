import fs from 'node:fs/promises'

import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'

import { CodeBlock } from '../ui/code-block'

const UI_PATH = 'src/components/ui'
const UTILITY_PATH = 'src/utils'
const HOOK_PATH = 'src/hooks'

type InstallationProps = {
  name: string
  type: 'ui' | 'utility' | 'hook'
}

const Installation = async (props: InstallationProps) => {
  const { name, type } = props

  let path

  switch (type) {
    case 'ui': {
      path = `${UI_PATH}/${name}.tsx`
      break
    }
    case 'utility': {
      path = `${UTILITY_PATH}/${name}.ts`
      break
    }
    case 'hook': {
      path = `${HOOK_PATH}/${name}.ts`
      break
    }
    default: {
      throw new Error('Invalid type')
    }
  }

  const code = await fs.readFile(path, 'utf8')

  const out = await codeToHast(code, {
    lang: 'tsx',
    themes: {
      light: 'github-light',
      dark: 'github-dark'
    },
    defaultColor: false
  })

  return (
    <>
      {toJsxRuntime(out, {
        Fragment,
        jsx,
        jsxs,
        components: {
          pre: (p) => (
            <CodeBlock
              data-lang={type === 'ui' ? 'tsx' : 'ts'}
              title={path}
              scrollAreaClassName='max-h-80'
              {...p}
            />
          )
        }
      })}
    </>
  )
}

export default Installation
