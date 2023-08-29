import Slugger from 'github-slugger'
import { marked } from 'marked'

const slugger = new Slugger()

export type Heading = {
  id: string
  level: number
  title: string
}

export const getHeadings = (content: string): Heading[] => {
  const headings: Heading[] = []

  slugger.reset()

  const tokens = marked.lexer(content)

  for (const token of tokens) {
    if (token.type === 'heading') {
      headings.push({
        id: slugger.slug(token.text as string),
        level: token.depth,
        title: token.text
      })
    }
  }

  return headings
}
