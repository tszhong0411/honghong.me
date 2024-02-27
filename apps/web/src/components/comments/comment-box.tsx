'use client'

import {
  Button,
  Link,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Textarea,
  toast
} from '@tszhong0411/ui'
import * as React from 'react'
import { useFormStatus } from 'react-dom'

import { postComment } from '@/actions/comment'
import { getMarkdownPreview } from '@/lib/get-markdown-preview'

import MarkdownPreview from './markdown-preview'

type CommentBoxProps =
  | {
      slug: string
      parentId?: undefined
      onCancel?: undefined
    }
  | {
      slug: string
      parentId: string
      onCancel: () => void
    }

type SubmitButtonProps = {
  parentId?: string
}

const SubmitButton = (props: SubmitButtonProps) => {
  const { parentId } = props
  const { pending } = useFormStatus()

  return (
    <Button type='submit' disabled={pending} aria-disabled={pending}>
      {parentId ? 'Reply' : 'Comment'}
    </Button>
  )
}

const CommentBox = (props: CommentBoxProps) => {
  const { slug, parentId, onCancel } = props
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = React.useState('')
  const id = React.useId()

  const postCommentHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const toastId = toast.loading('Creating a message...')

    const {
      result: { compiledSource: processedComment }
    } = await getMarkdownPreview(comment)
    const result = await postComment(slug, processedComment, comment, parentId)

    toast.dismiss(toastId)

    if (result.error) {
      toast.error(result.message)
    } else {
      toast.success(result.message)
      setComment('')
    }
  }

  React.useEffect(() => {
    if (parentId) {
      textareaRef.current?.focus()
    }
  }, [parentId])

  return (
    <Tabs defaultValue='write'>
      <TabsList>
        <TabsTrigger value='write'>Write</TabsTrigger>
        <TabsTrigger value='preview'>Preview</TabsTrigger>
      </TabsList>
      <form onSubmit={postCommentHandler}>
        <TabsContent value='write'>
          <Textarea
            aria-label={`Write your ${parentId ? 'reply' : 'comment'} here`}
            placeholder={`Write your ${parentId ? 'reply' : 'comment'} here...`}
            name='comment'
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </TabsContent>
        <TabsContent value='preview'>
          {comment ? (
            <MarkdownPreview
              className='min-h-20 rounded-lg border px-2 py-4 sm:px-4'
              source={comment}
              commentId={id}
            />
          ) : (
            <div className='min-h-20 p-2'>Nothing to preview</div>
          )}
        </TabsContent>
        <div className='mt-4 flex items-center justify-between'>
          <Link
            href='https://guides.github.com/features/mastering-markdown/'
            className='text-muted-foreground'
            title='Markdown is supported'
            aria-label='Markdown is supported'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 640 512'
              width='16'
              height='12.8'
              fill='currentColor'
            >
              <path d='M593.8 59.1H46.2C20.7 59.1 0 79.8 0 105.2v301.5c0 25.5 20.7 46.2 46.2 46.2h547.7c25.5 0 46.2-20.7 46.1-46.1V105.2c0-25.4-20.7-46.1-46.2-46.1zM338.5 360.6H277v-120l-61.5 76.9-61.5-76.9v120H92.3V151.4h61.5l61.5 76.9 61.5-76.9h61.5v209.2zm135.3 3.1L381.5 256H443V151.4h61.5V256H566z' />
            </svg>
          </Link>
          <div>
            {parentId && (
              <Button
                type='button'
                variant='outline'
                className='mr-2'
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
            <SubmitButton parentId={parentId} />
          </div>
        </div>
      </form>
    </Tabs>
  )
}

export default CommentBox
