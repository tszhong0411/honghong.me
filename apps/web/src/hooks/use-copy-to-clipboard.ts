import React from 'react'
import { toast } from 'sonner'

type CopyOptions = {
  text: string
  timeout?: number
  successMessage?: React.ReactNode
  errorMessage?: React.ReactNode
}

export const useCopyToClipboard = (): [
  (options: CopyOptions) => Promise<void>,
  boolean
] => {
  const [isCopied, setIsCopied] = React.useState(false)

  const copy = async ({
    text,
    timeout,
    successMessage,
    errorMessage
  }: CopyOptions) => {
    if (isCopied) return

    if (!navigator?.clipboard) {
      toast.error(
        'Unable to access clipboard. Please grant permission to enable clipboard access.'
      )
      return
    }

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      toast.success(successMessage ?? 'Copied to clipboard!')

      setTimeout(() => {
        setIsCopied(false)
      }, timeout ?? 2000)
    } catch {
      toast.error(
        errorMessage ?? 'Unable to copy to clipboard. Please try again.'
      )
    }
  }

  return [copy, isCopied]
}
