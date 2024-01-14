import { marked } from 'marked'

import slugify from './slugify'

export type Heading = {
  id: string
  level: number
  title: string
}

const getHeadings = (content: string): Heading[] => {
  const headings: Heading[] = []

  const tokens = marked.lexer(content)

  for (const token of tokens) {
    if (token.type === 'heading') {
      headings.push({
        id: slugify(token.text as string),
        level: token.depth,
        title: token.text
      })
    }
  }

  return headings
}

export default getHeadings
