import type { GetInfiniteCommentsInput } from '@/trpc/routers/comments'

import NumberFlow, { continuous, NumberFlowGroup } from '@number-flow/react'
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

const CommentHeader = () => {
  const { slug, sort, setSort } = useCommentsContext()
  const t = useTranslations()

  const commentsCountQuery = api.comments.getCommentsCount.useQuery({ slug })
  const repliesCountQuery = api.comments.getRepliesCount.useQuery({ slug })

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
