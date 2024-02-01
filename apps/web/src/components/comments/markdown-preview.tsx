'use client'

import { MDXRemote, type MDXRemoteProps } from 'next-mdx-remote'
import { toast } from 'sonner'
import useSWR from 'swr'

import { getMarkdownPreview } from '@/actions/comment'
import cn from '@/utils/cn'

import Checkbox from '../mdx/checkbox'
import Pre from '../mdx/pre'

type MarkdownProps =
  | {
      compiledSource?: undefined
      commentId: string
      source: string
      className?: string
    }
  | {
      compiledSource: string
      commentId: string
      source?: undefined
      className?: string
    }

const CommentRenderer = (props: MDXRemoteProps) => {
  return (
    <MDXRemote
      components={{
        pre: Pre,
        input: Checkbox
      }}
      {...props}
    />
  )
}

const MarkdownPreview = (props: MarkdownProps) => {
  const { source, compiledSource, commentId, className } = props

  const { data, isLoading } = useSWR(
    source ? commentId : null,
    () => getMarkdownPreview(source as string),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      onError: () => {
        toast.error('Failed to render markdown. Please check your syntax.')
      }
    }
  )

  return (
    <div
      className={cn(
        'prose prose-invert w-full max-w-none break-words [&_table_*]:border-border',
        className
      )}
    >
      {compiledSource && (
        <CommentRenderer
          compiledSource={compiledSource}
          scope={{}}
          frontmatter={{}}
        />
      )}
      {source && (
        <>
          {isLoading || !data ? (
            <p>Rendering...</p>
          ) : (
            <CommentRenderer {...data.result} />
          )}
        </>
      )}
    </div>
  )
}

export default MarkdownPreview
