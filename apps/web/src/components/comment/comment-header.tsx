import type { GetInfiniteCommentsInput } from '@/trpc/routers/comments'

import NumberFlow, { continuous, NumberFlowGroup } from '@number-flow/react'
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

import { useCommentsContext } from '@/contexts/comments'
import { useTRPC } from '@/trpc/client'

const CommentHeader = () => {
  const { slug, sort, setSort } = useCommentsContext()
  const trpc = useTRPC()
  const t = useTranslations()

  const commentsCountQuery = useQuery(trpc.comments.getCommentsCount.queryOptions({ slug }))
  const repliesCountQuery = useQuery(trpc.comments.getRepliesCount.queryOptions({ slug }))

  return (
    <div className='flex items-center justify-between px-1'>
      <NumberFlowGroup>
        <div>
          {commentsCountQuery.status === 'pending'
            ? `-- ${t('blog.comments.comments', { count: 0 })}`
            : null}
          {commentsCountQuery.status === 'error' ? t('common.error') : null}
          {commentsCountQuery.status === 'success' ? (
            <NumberFlow
              willChange
              plugins={[continuous]}
              value={commentsCountQuery.data.comments}
              suffix={` ${t('blog.comments.comments', { count: commentsCountQuery.data.comments })}`}
              data-testid='blog-comment-count'
            />
          ) : null}
          {' · '}
          {repliesCountQuery.status === 'pending'
            ? `-- ${t('blog.comments.replies', { count: 0 })}`
            : null}
          {repliesCountQuery.status === 'error' ? t('common.error') : null}
          {repliesCountQuery.status === 'success' ? (
            <NumberFlow
              willChange
              plugins={[continuous]}
              value={repliesCountQuery.data.replies}
              suffix={` ${t('blog.comments.replies', { count: repliesCountQuery.data.replies })}`}
              data-testid='reply-count'
            />
          ) : null}
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
              setSort(value as GetInfiniteCommentsInput['sort'])
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
