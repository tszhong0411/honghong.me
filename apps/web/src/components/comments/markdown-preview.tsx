'use client'

import { MDXRemote, type MDXRemoteProps } from '@tszhong0411/mdx'
import { toast } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import useSWR from 'swr'

import { getMarkdownPreview } from '@/lib/get-markdown-preview'

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

const CommentRenderer = (props: Omit<MDXRemoteProps, 'frontmatter'>) => {
  return (
    <MDXRemote
      components={{
        pre: Pre,
        input: Checkbox
      }}
      frontmatter={{}}
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
        'prose w-full break-words [&_table_*]:border-border',
        className
      )}
    >
      {compiledSource && <CommentRenderer compiledSource={compiledSource} />}
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
