import { type MDXProvider } from '@mdx-js/react'

export type MDXComponents = React.ComponentProps<
  typeof MDXProvider
>['components']

export type TOC = {
  title: string
  url: string
  depth: number
}
