import { compile, type CompileOptions } from '@mdx-js/mdx'
import { getErrorMessage } from '@tszhong0411/utils'
import { VFile, type VFileCompatible } from 'vfile'
import { matter } from 'vfile-matter'

import { defaultRehypePlugins, defaultRemarkPlugins } from './plugins'

export type SerializeResult<T = Record<string, unknown>> = {
  compiledSource: string
  frontmatter: T
}

export type SerializeOptions = {
  mdxOptions: CompileOptions
}

export const serialize = async <T>(
  source: VFileCompatible,
  options: SerializeOptions
): Promise<SerializeResult<T>> => {
  const {
    mdxOptions: { remarkPlugins, rehypePlugins, ...restOptions }
  } = options
  const vfile = new VFile(source)

  matter(vfile, { strip: true })

  let compiledMdx: VFile

  try {
    compiledMdx = await compile(vfile, {
      outputFormat: 'function-body',
      development: process.env.NODE_ENV === 'development',
      remarkPlugins: [...defaultRemarkPlugins, ...(remarkPlugins ?? [])],
      rehypePlugins: [...defaultRehypePlugins, ...(rehypePlugins ?? [])],
      ...restOptions
    })
  } catch (error) {
    throw new Error(`Error compiling MDX: ${getErrorMessage(error)}`)
  }

  return {
    compiledSource: String(compiledMdx),
    frontmatter: (vfile.data.matter ?? {}) as T
  }
}
