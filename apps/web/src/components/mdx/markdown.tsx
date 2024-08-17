import { CodeBlock, Link } from '@tszhong0411/ui'
import MarkdownToJSX from 'markdown-to-jsx'
import { memo } from 'react'

type MarkdownProps = {
  children: string
}

const Markdown = memo((props: MarkdownProps) => {
  const { children } = props

  return (
    <div className='prose'>
      <MarkdownToJSX
        options={{
          overrides: {
            a: Link,
            pre: CodeBlock
          }
        }}
      >
        {children}
      </MarkdownToJSX>
    </div>
  )
})

Markdown.displayName = 'Markdown'

export default Markdown
