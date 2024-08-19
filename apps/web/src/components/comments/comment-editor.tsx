import { Button, Textarea } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { BoldIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react'
import { useRef } from 'react'

type Command = {
  onModEnter?: () => void
  onEscape?: () => void
}

type CommentEditorProps = {
  initialValue?: string
} & Command &
  React.ComponentPropsWithoutRef<typeof Textarea>

const setRangeText = (
  textarea: HTMLTextAreaElement,
  replacement: string,
  start: number,
  end: number,
  selectionMode?: SelectionMode
) => {
  textarea.setRangeText(replacement, start, end, selectionMode)
  // Trigger input event to update the value
  textarea.dispatchEvent(new Event('input', { bubbles: true }))
}

const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>, command: Command) => {
  const { onModEnter, onEscape } = command
  const textarea = event.target as HTMLTextAreaElement
  const { selectionStart, selectionEnd, value } = textarea

  if (event.key === 'Tab') {
    event.preventDefault()
    const tabSpace = '  '

    setRangeText(textarea, tabSpace, selectionStart, selectionEnd, 'end')
    textarea.setSelectionRange(selectionStart + tabSpace.length, selectionStart + tabSpace.length)
  }

  if (event.key === 'Escape') {
    event.preventDefault()
    onEscape?.()

    return
  }

  if (event.key === 'Enter' && (event.metaKey || event.ctrlKey)) {
    event.preventDefault()
    onModEnter?.()

    return
  }

  if (event.key === 'Enter') {
    const currentLine = value.slice(0, Math.max(0, selectionStart)).split('\n').pop()

    const unorderedListNoContent = currentLine?.match(/^(\s*)([*-])\s$/)
    const orderedListNoContent = currentLine?.match(/^(\d+)\.\s$/)

    if (!!unorderedListNoContent || !!orderedListNoContent) {
      event.preventDefault()

      const lineStart = value.lastIndexOf('\n', selectionStart - 1) + 1
      const lineEnd = selectionStart
      setRangeText(textarea, '', lineStart, lineEnd, 'start')

      return
    }

    const orderedList = currentLine?.match(/^(\d+)\.\s/)

    if (orderedList?.[1]) {
      const number = Number.parseInt(orderedList[1], 10) + 1
      const insertText = `\n${number}. `

      event.preventDefault()
      setRangeText(textarea, insertText, selectionStart, selectionEnd, 'end')
    }

    const unorderedList = currentLine?.match(/^(\s*)([*-])\s/)

    if (unorderedList) {
      const insertText = `\n${unorderedList[1]}${unorderedList[2]} `

      event.preventDefault()
      setRangeText(textarea, insertText, selectionStart, selectionEnd, 'end')
    }
  }
}

const decorateText = (
  textarea: HTMLTextAreaElement | null,
  type: 'bold' | 'italic' | 'strikethrough'
) => {
  if (!textarea) return

  const { selectionStart, selectionEnd, value } = textarea
  const selectedText = value.slice(selectionStart, selectionEnd)

  const decoration = {
    bold: `**${selectedText}**`,
    strikethrough: `~~${selectedText}~~`,
    italic: `*${selectedText}*`
  }

  const newSelectionStart = {
    bold: selectionStart + 2,
    strikethrough: selectionStart + 2,
    italic: selectionStart + 1
  }

  setRangeText(textarea, decoration[type], selectionStart, selectionEnd, 'end')

  if (!selectedText) {
    textarea.setSelectionRange(newSelectionStart[type], newSelectionStart[type])
  }

  textarea.focus()
}

const CommentEditor = (props: CommentEditorProps) => {
  const { onModEnter, onEscape, initialValue, ...rest } = props
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  return (
    <div
      className={cn(
        'bg-background ring-offset-background focus-within:ring-ring rounded-lg border pb-1',
        'focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2',
        'aria-disabled:cursor-not-allowed aria-disabled:opacity-80'
      )}
    >
      <Textarea
        rows={1}
        onKeyDown={(e) => {
          handleKeyDown(e, { onModEnter, onEscape })
        }}
        ref={textareaRef}
        defaultValue={initialValue}
        className='min-h-10 resize-none border-none focus-visible:ring-0 focus-visible:ring-offset-0'
        autoComplete='off'
        autoCorrect='off'
        autoCapitalize='off'
        spellCheck='false'
        {...rest}
      />
      <div className='flex flex-row items-center gap-0.5 px-1.5'>
        <Button
          type='button'
          aria-label='Toggle bold'
          variant='ghost'
          size='icon'
          className='size-7'
          onClick={() => {
            decorateText(textareaRef.current, 'bold')
          }}
        >
          <BoldIcon className='size-4' />
        </Button>
        <Button
          type='button'
          aria-label='Toggle strikethrough'
          variant='ghost'
          size='icon'
          className='size-7'
          onClick={() => {
            decorateText(textareaRef.current, 'strikethrough')
          }}
        >
          <StrikethroughIcon className='size-4' />
        </Button>
        <Button
          type='button'
          aria-label='Toggle italic'
          variant='ghost'
          size='icon'
          className='size-7'
          onClick={() => {
            decorateText(textareaRef.current, 'italic')
          }}
        >
          <ItalicIcon className='size-4' />
        </Button>
      </div>
    </div>
  )
}

export default CommentEditor
