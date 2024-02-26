'use client'

import { MDXProvider, useMDXComponents } from '@mdx-js/react'
import React from 'react'
import * as jsxDevRuntime from 'react/jsx-dev-runtime'
import * as jsxRuntime from 'react/jsx-runtime'

import { type SerializeResult } from './serialize'
import { type MDXComponents } from './types'

export type MDXRemoteProps = SerializeResult & {
  components?: MDXComponents
}

export const MDXRemote = ({
  compiledSource,
  frontmatter,
  components = {}
}: MDXRemoteProps) => {
  const isDev = process.env.NODE_ENV === 'development'

  const Content: React.ElementType = React.useMemo(() => {
    const fullScope = Object.assign(
      {
        opts: {
          MDXProvider,
          useMDXComponents,
          ...(isDev ? jsxDevRuntime : jsxRuntime)
        }
      },
      { frontmatter }
    )
    const keys = Object.keys(fullScope)
    const values = Object.values(fullScope)

    const hydrateFn = Reflect.construct(Function, [...keys, compiledSource])

    return hydrateFn.apply(hydrateFn, values).default as React.ElementType
  }, [compiledSource, frontmatter, isDev])

  return (
    <MDXProvider components={components}>
      <Content />
    </MDXProvider>
  )
}
