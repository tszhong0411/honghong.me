import { Table } from '@mantine/core'

import { ChildrenType } from '@/lib/types'

const CustomTable = ({ children }: ChildrenType) => {
  return (
    <Table verticalSpacing='sm' fontSize='md' striped highlightOnHover>
      {children}
    </Table>
  )
}

export default CustomTable
