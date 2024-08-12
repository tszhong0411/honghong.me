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

import type { CommentsInput } from '@/trpc/routers/comments'

type CommentHeaderProps = {
  sort: CommentsInput['sort']
  onSortChange: (sort: CommentsInput['sort']) => void
  commentsCount: number | undefined
  repliesCount: number | undefined
}

const CommentHeader = (props: CommentHeaderProps) => {
  const { sort, onSortChange, commentsCount, repliesCount } = props

  return (
    <div className='flex items-center justify-between px-1'>
      <div>
        {commentsCount ? pluralize('comment', commentsCount, true) : '-- comments'} ·{' '}
        {repliesCount ? pluralize('reply', repliesCount, true) : '-- replies'}
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
