import { toast } from '@tszhong0411/ui'
import { useState } from 'react'

type CopyOptions = {
  text: string
  timeout?: number
  successMessage?: React.ReactNode
  errorMessage?: React.ReactNode
}

export const useCopyToClipboard = (): [(options: CopyOptions) => Promise<void>, boolean] => {
  const [isCopied, setIsCopied] = useState(false)

  const copy = async ({ text, timeout, successMessage, errorMessage }: CopyOptions) => {
    if (isCopied) return

    try {
      await navigator.clipboard.writeText(text)
      setIsCopied(true)
      toast.success(successMessage ?? 'Copied to clipboard!')

      setTimeout(() => {
        setIsCopied(false)
      }, timeout ?? 2000)
    } catch {
      toast.error(errorMessage ?? 'Unable to copy to clipboard. Please try again!')
    }
  }

  return [copy, isCopied]
}
