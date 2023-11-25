'use client'

import { IconCheck, IconCopy } from '@tabler/icons-react'
import React from 'react'
import toast from 'react-hot-toast'

type CopyButtonProps = {
  text: string
}

const CopyButton = (props: CopyButtonProps) => {
  const { text } = props

  const [isCopied, setCopied] = React.useState(false)

  const onCopy = async () => {
    setCopied(true)

    if (!navigator?.clipboard) {
      toast.error('Access to clipboard rejected!')
    }

    try {
      await navigator.clipboard.writeText(text)
      toast.success('Copied')
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
    <button
      className='absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md border bg-background opacity-0 transition [div:hover>&]:opacity-100'
      onClick={onCopy}
      type='button'
      aria-label='Copy code to clipboard'
    >
      {isCopied ? (
        <IconCheck size={16} />
      ) : (
        <IconCopy data-testid='copy' size={16} />
      )}
    </button>
  )
}

export default CopyButton
