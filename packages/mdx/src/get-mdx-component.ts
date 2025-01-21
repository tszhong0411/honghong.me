import type { MDXComponents } from 'mdx/types'

import React from 'react'
import * as _jsx_runtime from 'react/jsx-runtime'
import ReactDOM from 'react-dom'

type MDXContentProps = {
  components: MDXComponents
}

export const getMDXComponent = (code: string) => {
  const scope = { React, ReactDOM, _jsx_runtime }
  const keys = Object.keys(scope)
  const values = Object.values(scope)

  const fn = Reflect.construct(Function, [...keys, code])
  return fn.apply(fn, values).default as React.FC<MDXContentProps>
}
