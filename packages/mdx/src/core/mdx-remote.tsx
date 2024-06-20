import type { CompileOptions } from '@mdx-js/mdx'
import * as jsxDevRuntime from 'react/jsx-dev-runtime'
import * as jsxRuntime from 'react/jsx-runtime'
import { type VFileCompatible } from 'vfile'

import { serialize } from './serialize'
import { type MDXComponents } from './types'

export type MDXRemoteRSCProps = {
  source: VFileCompatible
  mdxOptions?: CompileOptions
  components?: MDXComponents
}

export const compileMDX = async ({
  source,
  mdxOptions = {},
  components = {}
}: MDXRemoteRSCProps) => {
  const { compiledSource, frontmatter } = await serialize(source, {
    mdxOptions
  })

  const isDev = process.env.NODE_ENV === 'development'

  const fullScope = Object.assign(
    {
      opts: isDev ? jsxDevRuntime : jsxRuntime
    },
    { frontmatter }
  )
  const keys = Object.keys(fullScope)
  const values = Object.values(fullScope)

  const hydrateFn = Reflect.construct(Function, [...keys, compiledSource])

  const Content: React.ElementType = hydrateFn.apply(hydrateFn, values).default

  return {
    content: <Content components={components} />,
    frontmatter
  }
}

export const MDXRemote = async (props: MDXRemoteRSCProps) => {
  const { content } = await compileMDX(props)
  return content
}
