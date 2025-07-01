import type { ListCommentsInput } from '@/orpc/routers'

import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
import { useQuery } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@tszhong0411/ui'
import { ListFilterIcon } from 'lucide-react'

import { orpc } from '@/orpc/client'
import { useCommentsStore } from '@/stores/comments'

const CommentHeader = () => {
  const { slug, sort, setSort } = useCommentsStore((state) => ({
    slug: state.slug,
    sort: state.sort,
    setSort: state.setSort
  }))
  const t = useTranslations()

  const commentCountQuery = useQuery(orpc.posts.comments.count.queryOptions({ input: { slug } }))
  const replyCountQuery = useQuery(orpc.posts.replies.count.queryOptions({ input: { slug } }))

  return (
    <div className='flex items-center justify-between px-1'>
      <NumberFlowGroup>
        <div>
          {commentCountQuery.status === 'pending' &&
            `-- ${t('blog.comments.comments', { count: 0 })}`}
          {commentCountQuery.status === 'error' && t('common.error')}
          {commentCountQuery.status === 'success' && (
            <NumberFlow
              value={commentCountQuery.data.count}
              suffix={` ${t('blog.comments.comments', { count: commentCountQuery.data.count })}`}
              data-testid='blog-comment-count'
            />
          )}
          {' · '}
          {replyCountQuery.status === 'pending' && `-- ${t('blog.comments.replies', { count: 0 })}`}
          {replyCountQuery.status === 'error' && t('common.error')}
          {replyCountQuery.status === 'success' && (
            <NumberFlow
              value={replyCountQuery.data.count}
              suffix={` ${t('blog.comments.replies', { count: replyCountQuery.data.count })}`}
              data-testid='reply-count'
            />
          )}
        </div>
      </NumberFlowGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant='outline' size='sm' className='h-7 gap-1 text-sm'>
            <ListFilterIcon className='size-3.5' />
            <span>{t('blog.comments.sort-by')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={(value) => {
              setSort(value as ListCommentsInput['sort'])
            }}
          >
            <DropdownMenuRadioItem value='newest'>
              {t('blog.comments.newest')}
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='oldest'>
              {t('blog.comments.oldest')}
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CommentHeader
