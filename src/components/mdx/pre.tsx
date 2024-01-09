'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import React from 'react'

import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard'

type PreProps = React.ComponentPropsWithoutRef<'pre'>

const Pre = (props: PreProps) => {
  const { children, ...rest } = props

  const textInput = React.useRef<HTMLPreElement>(null)
  const [text, setText] = React.useState<string>('')
  const [copy, isCopied] = useCopyToClipboard()

  React.useEffect(() => {
    if (textInput.current) {
      setText(textInput.current.textContent ?? '')
    }
  }, [])

  return (
    <>
      <pre ref={textInput} {...rest}>
        {children}
      </pre>
      <button
        className='absolute right-4 top-0 flex size-8 items-center justify-center rounded-md border bg-accent opacity-0 transition [[data-rehype-pretty-code-figure]:hover>&]:opacity-100'
        onClick={() => copy({ text })}
        type='button'
        aria-label='Copy code to clipboard'
      >
        {isCopied ? <IconCheck size={16} /> : <IconCopy size={16} />}
      </button>
    </>
  )
}

export default Pre
