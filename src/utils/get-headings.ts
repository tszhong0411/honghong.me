import Slugger from 'github-slugger'
import { marked } from 'marked'

const slugger = new Slugger()

/**
 * A type representing a heading in a document.
 */
export type Heading = {
  /**
   * The ID of the heading.
   */
  id: string
  /**
   * The level of the heading (1 for h1, 2 for h2, etc.).
   */
  level: number
  /**
   * The text content of the heading.
   */
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
