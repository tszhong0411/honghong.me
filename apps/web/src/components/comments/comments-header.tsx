import NumberFlow, { NumberFlowGroup } from '@number-flow/react'
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
import { api } from '@/trpc/react'
import type { CommentsInput } from '@/trpc/routers/comments'

const CommentHeader = () => {
  const { slug, sort, setSort } = useCommentsContext()
  const t = useTranslations('blog.comments')

  const commentsCountQuery = api.comments.getCommentsCount.useQuery({ slug })
  const repliesCountQuery = api.comments.getRepliesCount.useQuery({ slug })

  return (
    <div className='flex items-center justify-between px-1'>
      <NumberFlowGroup>
        <div>
          {commentsCountQuery.status === 'pending' ? '-- comments' : null}
          {commentsCountQuery.status === 'error' ? 'Error' : null}
          {commentsCountQuery.status === 'success' ? (
            <NumberFlow
              willChange
              continuous
              value={commentsCountQuery.data.comments}
              suffix={` ${t('comments', { count: commentsCountQuery.data.comments })}`}
            />
          ) : null}
          {' · '}
          {repliesCountQuery.status === 'pending' ? '-- replies' : null}
          {repliesCountQuery.status === 'error' ? 'Error' : null}
          {repliesCountQuery.status === 'success' ? (
            <NumberFlow
              willChange
              continuous
              value={repliesCountQuery.data.replies}
              suffix={` ${t('replies', { count: repliesCountQuery.data.replies })}`}
            />
          ) : null}
        </div>
      </NumberFlowGroup>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type='button' variant='outline' size='sm' className='h-7 gap-1 text-sm'>
            <ListFilterIcon className='size-3.5' />
            <span>{t('sort-by')}</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={(value) => {
              setSort(value as CommentsInput['sort'])
            }}
          >
            <DropdownMenuRadioItem value='newest'>{t('newest')}</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='oldest'>{t('oldest')}</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CommentHeader
