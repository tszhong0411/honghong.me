import { useState, useRef, ReactNode } from 'react'
import { Box } from '../Box'
import { StyledButon } from './Styles'

interface Props {
  children: ReactNode
}

const Pre = ({ children }: Props) => {
  const textInput = useRef(null)
  const [copied, setCopied] = useState(false)

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Box ref={textInput} css={{ position: 'relative' }}>
      <StyledButon aria-label="Copy code" type="button" copied={copied} onClick={onCopy}>
        <Box
          as="svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          css={
            copied
              ? { color: 'hsla($palette-green-40, 100%)' }
              : { color: 'hsla($palette-gray-30, 100%)' }
          }
        >
          {copied ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
              />
            </>
          ) : (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </>
          )}
        </Box>
      </StyledButon>
      <pre>{children}</pre>
    </Box>
  )
}

export default Pre
