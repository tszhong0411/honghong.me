import { serialize } from '@tszhong0411/mdx'

export const getMarkdownPreview = async (content: string) => {
  return {
    result: await serialize(content)
  }
}
