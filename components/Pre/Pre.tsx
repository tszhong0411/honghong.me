import { ReactNode, useRef, useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { HiCheckCircle, HiClipboard } from 'react-icons/hi'

interface Props {
  children: ReactNode
}

const Pre = ({ children }: Props) => {
  const textInput = useRef(null)
  const [isCopied, setIsCopied] = useState<boolean>(false)

  return (
    <div className="relative" ref={textInput}>
      <CopyToClipboard
        text={textInput?.current?.textContent ?? ''}
        onCopy={() => {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 1500)
        }}
      >
        <button
          className="absolute top-2 right-4 rounded border-2 border-gray-400 p-2 text-lg text-white transition-colors hover:bg-gray-700"
          aria-label="Copy Code"
        >
          {isCopied ? <HiCheckCircle className="text-green-400" /> : <HiClipboard />}
        </button>
      </CopyToClipboard>
      <pre>{children}</pre>
    </div>
  )
}

export default Pre
