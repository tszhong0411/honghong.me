import fs from 'node:fs/promises'

import { toJsxRuntime } from 'hast-util-to-jsx-runtime'
import { Fragment } from 'react'
import { jsx, jsxs } from 'react/jsx-runtime'
import { codeToHast } from 'shiki/bundle/web'

import { CodeBlock } from '../ui/code-block'

type ComponentInstallationProps = {
  name: string
}

const ComponentInstallation = async (props: ComponentInstallationProps) => {
  const { name } = props

  const code = await fs.readFile(`src/components/ui/${name}.tsx`, 'utf8')

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
          pre: (p) => <CodeBlock scrollAreaClassName='max-h-80' {...p} />
        }
      })}
    </>
  )
}

export default ComponentInstallation
