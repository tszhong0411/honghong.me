import React from 'react'
import * as jsxDevRuntime from 'react/jsx-dev-runtime'
import * as jsxRuntime from 'react/jsx-runtime'
import { type VFileCompatible } from 'vfile'

import { serialize } from './serialize'
import { type MDXComponents } from './types'

export type MDXRemoteRSCProps = {
  source: VFileCompatible
  components?: MDXComponents
}

export const compileMDX = async ({
  source,
  components = {}
}: MDXRemoteRSCProps) => {
  const { compiledSource, frontmatter } = await serialize(source, {
    rsc: true
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

export const MDXRemoteRSC = async (props: MDXRemoteRSCProps) => {
  const { content } = await compileMDX(props)
  return content
}
