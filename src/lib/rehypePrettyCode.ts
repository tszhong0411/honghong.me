import { type Options } from 'rehype-pretty-code'

export const rehypePrettyCodeOptions: Partial<Options> = {
  theme: {
    dark: 'github-dark',
    light: 'github-light',
  },
  onVisitHighlightedLine(node) {
    node.properties.className.push('line--highlighted')
  },
  onVisitHighlightedWord(node) {
    node.properties.className = ['word']
  },
}
