import { cn } from '@tszhong0411/utils'
import { CheckIcon, CopyIcon } from 'lucide-react'
import mergeRefs from 'merge-refs'
import { useEffect, useRef, useState } from 'react'

import { Button, type ButtonProps } from './button'
import { ScrollArea, ScrollBar } from './scroll-area'
import { getIconByFilename } from './utils/get-icon-by-filename'

type CodeBlockProps = {
  'data-lang'?: string
  figureClassName?: string
} & React.ComponentProps<'pre'>

const CodeBlock = (props: CodeBlockProps) => {
  const { children, className, title, 'data-lang': lang, figureClassName, ref, ...rest } = props

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
        <CopyButton className='absolute right-1.5 top-1.5 z-10' onCopy={onCopy} />
      )}

      <ScrollArea>
        <pre ref={mergeRefs(textInput, ref)} className={cn('p-4', className)} {...rest}>
          {children}
        </pre>
        <ScrollBar orientation='horizontal' />
      </ScrollArea>
    </figure>
  )
}

type CopyButtonProps = {
  onCopy: () => void
} & ButtonProps

const CopyButton = (props: CopyButtonProps) => {
  const { onCopy, className, ...rest } = props
  const [isCopied, setIsCopied] = useState(false)

  useEffect(() => {
    const copyResetTimeoutId = setTimeout(() => {
      setIsCopied(false)
    }, 2000)

    return () => {
      clearTimeout(copyResetTimeoutId)
    }
  }, [isCopied])

  return (
    <Button
      variant='outline'
      size='icon'
      onClick={() => {
        onCopy()
        setIsCopied(true)
      }}
      className={cn('opacity-0 transition-opacity group-hover:opacity-100', className)}
      aria-label='Copy code to clipboard'
      {...rest}
    >
      {isCopied ? <CheckIcon className='size-4' /> : <CopyIcon className='size-4' />}
    </Button>
  )
}

export { CodeBlock }
