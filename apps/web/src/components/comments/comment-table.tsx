import { Table } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'

type CommentTableProps = React.ComponentPropsWithoutRef<'table'>

const CommentTable = (props: CommentTableProps) => {
  const { className, ...rest } = props

  return <Table className={cn('not-prose my-2', className)} {...rest} />
}

export default CommentTable
