'use client'

import { cn } from '@tszhong0411/utils'
import { CheckIcon, CopyIcon } from 'lucide-react'
import mergeRefs from 'merge-refs'
import { forwardRef, useEffect, useRef, useState } from 'react'

import { Button, type ButtonProps } from './button'
import { ScrollArea, ScrollBar } from './scroll-area'
import { getIconByFilename } from './utils/get-icon-by-filename'

type CodeBlockProps = {
  'data-lang'?: string
  figureClassName?: string
} & React.ComponentPropsWithoutRef<'pre'>

export const CodeBlock = forwardRef<HTMLPreElement, CodeBlockProps>((props, ref) => {
  const { children, className, title, 'data-lang': lang, figureClassName, ...rest } = props

  const textInput = useRef<HTMLPreElement>(null)
  const Icon = getIconByFilename(lang ?? '')

  const onCopy = () => {
    void navigator.clipboard.writeText(textInput.current?.textContent ?? '')
  }

  return (
    <figure
      className={cn(
        'not-prose bg-secondary/50 group relative my-6 overflow-hidden rounded-lg border text-sm',
        figureClassName
      )}
    >
      {title ? (
        <div className='bg-muted/50 flex flex-row items-center gap-2 border-b px-4 py-1.5'>
          <div className='text-muted-foreground'>
            <Icon className='size-3.5' />
          </div>
          <figcaption className='text-muted-foreground flex-1 truncate'>{title}</figcaption>
          <CopyButton onCopy={onCopy} />
        </div>
      ) : (
        <CopyButton className='absolute right-4 top-3 z-10' onCopy={onCopy} />
      )}

      <ScrollArea>
        <pre ref={mergeRefs(textInput, ref)} className={cn('p-4', className)} {...rest}>
          {children}
        </pre>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </figure>
  )
})

type CopyButtonProps = {
  onCopy: () => void
} & ButtonProps

const CopyButton = (props: CopyButtonProps) => {
  const { onCopy, className, ...rest } = props
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false)
    }, 2000)
  }, [isCopied])

  return (
    <Button
      className={cn('size-8 p-0 opacity-0 transition-opacity group-hover:opacity-100', className)}
      variant='outline'
      onClick={() => {
        onCopy()
        setIsCopied(true)
      }}
      type='button'
      aria-label='Copy code to clipboard'
      {...rest}
    >
      {isCopied ? <CheckIcon className='size-4' /> : <CopyIcon className='size-4' />}
    </Button>
  )
}

CodeBlock.displayName = 'CodeBlock'
