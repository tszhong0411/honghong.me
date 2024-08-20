import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger
} from '@tszhong0411/ui'
import { ListFilterIcon } from 'lucide-react'
import pluralize from 'pluralize'

import { useCommentsContext } from '@/contexts/comments'
import { api } from '@/trpc/react'
import type { CommentsInput } from '@/trpc/routers/comments'

const CommentHeader = () => {
  const { slug, sort, setSort } = useCommentsContext()

  const commentsCountQuery = api.comments.getCommentsCount.useQuery({ slug })
  const repliesCountQuery = api.comments.getRepliesCount.useQuery({ slug })

  return (
    <div className='flex items-center justify-between px-1'>
      <div>
        {commentsCountQuery.status === 'pending' ? '-- comments' : null}
        {commentsCountQuery.status === 'error' ? 'Error' : null}
        {commentsCountQuery.status === 'success'
          ? pluralize('comment', commentsCountQuery.data.comments, true)
          : null}
        {' · '}
        {repliesCountQuery.status === 'pending' ? '-- replies' : null}
        {repliesCountQuery.status === 'error' ? 'Error' : null}
        {repliesCountQuery.status === 'success'
          ? pluralize('reply', repliesCountQuery.data.replies, true)
          : null}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type='button' variant='outline' size='sm' className='h-7 gap-1 text-sm'>
            <ListFilterIcon className='size-3.5' />
            <span>Sort by</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={(value) => {
              setSort(value as CommentsInput['sort'])
            }}
          >
            <DropdownMenuRadioItem value='newest'>Newest</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value='oldest'>Oldest</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

export default CommentHeader
