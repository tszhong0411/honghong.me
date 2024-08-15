import { Blockquote } from '@tiptap/extension-blockquote'
import { Bold } from '@tiptap/extension-bold'
import { BulletList } from '@tiptap/extension-bullet-list'
import { Document } from '@tiptap/extension-document'
import { Heading } from '@tiptap/extension-heading'
import { History } from '@tiptap/extension-history'
import { HorizontalRule } from '@tiptap/extension-horizontal-rule'
import { Italic } from '@tiptap/extension-italic'
import { ListItem } from '@tiptap/extension-list-item'
import { OrderedList } from '@tiptap/extension-ordered-list'
import { Paragraph } from '@tiptap/extension-paragraph'
import { Placeholder } from '@tiptap/extension-placeholder'
import { Strike } from '@tiptap/extension-strike'
import { Text } from '@tiptap/extension-text'
import { Typography } from '@tiptap/extension-typography'
import { Editor, EditorContent, type JSONContent } from '@tiptap/react'
import { cn } from '@tszhong0411/utils'
import { useEffect, useState } from 'react'

import CommentToolbar from './comment-toolbar'

type CommentEditorProps = {
  editor: UseCommentEditor | null
  placeholder?: string
  autofocus?: boolean
  editable?: boolean
  disabled?: boolean
  content?: JSONContent
  onChange?: (editor: UseCommentEditor) => void
}

type UseCommentEditor = {
  editor: Editor
  isEmpty: boolean
  getValue: () => JSONContent
  clearValue: () => void
}

export const useCommentEditor = (): [
  editor: UseCommentEditor | null,
  setEditor: (editor: UseCommentEditor) => void
] => {
  return useState<UseCommentEditor | null>(null)
}

const createCommentEditor = (editor: Editor): UseCommentEditor => {
  return {
    editor,
    isEmpty: editor.isEmpty,
    getValue() {
      return editor.getJSON()
    },
    clearValue() {
      editor.commands.clearContent(true)
    }
  }
}

const CommentEditor = (props: CommentEditorProps) => {
  const {
    editor,
    placeholder,
    autofocus = false,
    editable = true,
    disabled = false,
    content,
    onChange
  } = props
  const innerEditor = editor?.editor ?? null

  const editorClassName = cn(
    'bg-background ring-offset-background rounded-lg border pb-1',
    'focus-within:ring-ring focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2',
    'aria-disabled:cursor-not-allowed aria-disabled:opacity-80'
  )

  const tiptapClassName = cn('prose focus-visible:outline-none', editable && 'min-h-10 px-3 py-2')

  useEffect(() => {
    const instance = new Editor({
      extensions: [
        Bold,
        Document,
        Italic,
        Paragraph,
        Strike,
        Text,
        Typography,
        Blockquote,
        HorizontalRule,
        ListItem,
        OrderedList,
        BulletList,
        History,
        Heading.configure({
          levels: [1, 2, 3, 4]
        }),
        Placeholder.configure({
          placeholder: ({ node }) => {
            if (node.type.name === 'heading') {
              return `Heading ${node.attrs.level}`
            }

            if (node.type.name === 'blockquote') {
              return 'Blockquote'
            }

            return placeholder ?? ''
          },
          showOnlyWhenEditable: false
        })
      ],
      autofocus,
      content,
      editorProps: {
        attributes: {
          class: tiptapClassName
        }
      },
      editable,
      onTransaction: () => {
        onChange?.(createCommentEditor(instance))
      }
    })

    onChange?.(createCommentEditor(instance))

    return () => {
      instance.destroy()
    }
  }, [autofocus, content, editable, onChange, placeholder, tiptapClassName])

  if (!innerEditor) {
    return (
      <div aria-disabled className={editorClassName}>
        <div className={cn('tiptap', tiptapClassName)}>
          <p className='is-editor-empty' data-placeholder={placeholder} />
        </div>
      </div>
    )
  }

  if (!editable) {
    return <EditorContent editor={innerEditor} />
  }

  innerEditor.setEditable(!disabled)

  return (
    <div aria-disabled={disabled} className={editorClassName}>
      <EditorContent editor={innerEditor} />
      <CommentToolbar editor={innerEditor} />
    </div>
  )
}

export default CommentEditor
