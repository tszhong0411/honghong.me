import { useState, useRef, ReactNode } from 'react'
import cn from 'classnames'
import { motion } from 'framer-motion'
interface Props {
  children: ReactNode
}

const Pre = ({ children }: Props) => {
  const textInput = useRef(null)
  const [hovered, setHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const onEnter = () => {
    setHovered(true)
  }

  const onExit = () => {
    setHovered(false)
    setCopied(false)
  }

  const onCopy = () => {
    setCopied(true)
    navigator.clipboard.writeText(textInput.current.textContent)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  const variants = {
    show: { opacity: 1 },
    notShow: { opacity: 0 },
  }

  return (
    <div className="relative" onMouseEnter={onEnter} onMouseLeave={onExit} ref={textInput}>
      <motion.button
        aria-label="Copy code"
        type="button"
        onClick={onCopy}
        className={cn(
          'absolute right-4 top-2 h-8 w-8 rounded border-2 bg-gray-700 p-1 dark:bg-gray-800',
          copied ? 'border-green-400 focus:border-green-400 focus:outline-none' : 'border-gray-300'
        )}
        animate={hovered ? 'show' : 'notShow'}
        variants={variants}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          className={copied ? 'text-green-400' : 'text-gray-300'}
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
        </svg>
      </motion.button>
      <pre>{children}</pre>
    </div>
  )
}

export default Pre
