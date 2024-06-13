import type { Editor } from '@tiptap/react'
import { Button } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { BoldIcon, ItalicIcon, StrikethroughIcon } from 'lucide-react'

type CommentToolbarProps = {
  editor: Editor
}

const CommentToolbar = (props: CommentToolbarProps) => {
  const { editor } = props

  return (
    <div className='flex flex-row items-center gap-0.5 px-1.5'>
      {[
        {
          name: 'bold',
          icon: <BoldIcon className='size-4' />
        },
        {
          name: 'strike',
          icon: <StrikethroughIcon className='size-4' />
        },
        {
          name: 'italic',
          icon: <ItalicIcon className='size-4' />
        }
      ].map((item) => (
        <Button
          key={item.name}
          aria-label={`Toggle ${item.name}`}
          variant='ghost'
          size='icon'
          className={cn('size-7', editor.isActive(item.name) && 'bg-accent text-accent-foreground')}
          disabled={!editor.can().toggleMark(item.name) || !editor.isEditable}
          onClick={() => editor.commands.toggleMark(item.name)}
          type='button'
        >
          {item.icon}
        </Button>
      ))}
    </div>
  )
}

export default CommentToolbar
