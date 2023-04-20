'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import React from 'react'
import { toast } from 'react-hot-toast'

type PreProps = JSX.IntrinsicElements['pre']

const Pre = (props: PreProps) => {
  const { children, ...rest } = props

  const textInput = React.useRef<HTMLPreElement>(null)
  const [isCopied, setCopied] = React.useState(false)

  const onCopy = async () => {
    setCopied(true)

    if (!navigator?.clipboard) {
      toast.error('Access to clipboard rejected!')
    }

    try {
      if (textInput.current?.textContent) {
        await navigator.clipboard.writeText(textInput.current.textContent)
        toast.success('Copied')
      }
    } catch {
      toast.error('Failed to copy!')
    }
  }

  React.useEffect(() => {
    if (!isCopied) return

    const timerId = setTimeout(() => {
      setCopied(false)
    }, 2000)

    return () => {
      clearTimeout(timerId)
    }
  }, [isCopied])

  return (
    <>
      <pre className='relative' ref={textInput} {...rest}>
        {children}
      </pre>
      <button
        className='absolute right-4 top-4 opacity-0 transition [div:hover>&]:opacity-100'
        onClick={onCopy}
        type='button'
        aria-label='Copy code to clipboard'
        title='Copy code to clipboard'
      >
        {isCopied ? <IconCheck size={20} /> : <IconCopy size={20} />}
      </button>
    </>
  )
}

export default Pre
