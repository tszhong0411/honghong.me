'use client'

import React from 'react'

import CopyButton from '../copy-button'

type PreProps = React.ComponentPropsWithoutRef<'pre'>

const Pre = (props: PreProps) => {
  const { children, ...rest } = props

  const textInput = React.useRef<HTMLPreElement>(null)

  const [text, setText] = React.useState<string>('')

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
      <CopyButton text={text} />
    </>
  )
}

export default Pre
