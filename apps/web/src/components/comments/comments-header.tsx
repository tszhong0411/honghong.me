import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@tszhong0411/ui'
import { ListFilterIcon } from 'lucide-react'
import pluralize from 'pluralize'

import { useCommentsContext } from '@/contexts/comments'
import { api } from '@/trpc/react'
import type { CommentsInput } from '@/trpc/routers/comments'

type CommentHeaderProps = {
  sort: CommentsInput['sort']
  onSortChange: (sort: CommentsInput['sort']) => void
}

const CommentHeader = (props: CommentHeaderProps) => {
  const { sort, onSortChange } = props
  const { slug } = useCommentsContext()

  const commentsCountQuery = api.comments.getCommentsCount.useQuery({ slug })
  const repliesCountQuery = api.comments.getRepliesCount.useQuery({ slug })

  return (
    <div className='flex items-center justify-between px-1'>
      <div>
        {commentsCountQuery.isLoading
          ? '-- comments'
          : pluralize('comment', commentsCountQuery.data?.value, true)}{' '}
        ·{' '}
        {repliesCountQuery.isLoading
          ? '-- replies'
          : pluralize('reply', repliesCountQuery.data?.value, true)}
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button type='button' variant='outline' size='sm' className='h-7 gap-1 text-sm'>
            <ListFilterIcon className='size-3.5' />
            <span>Filter</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end'>
          <DropdownMenuLabel>Filter by</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup
            value={sort}
            onValueChange={(value) => {
              onSortChange(value as CommentsInput['sort'])
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
