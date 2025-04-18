'use client'

import {
  Pagination,
  PaginationContext,
  PaginationEllipsis,
  PaginationItem,
  PaginationNextTrigger,
  PaginationPrevTrigger
} from '@tszhong0411/ui'

const PaginationDemo = () => {
  return (
    <Pagination count={100}>
      <PaginationPrevTrigger />
      <PaginationContext>
        {(context) =>
          context.pages.map((page, index) =>
            page.type === 'page' ? (
              <PaginationItem key={index} {...page}>
                {page.value}
              </PaginationItem>
            ) : (
              <PaginationEllipsis key={index} index={index} />
            )
          )
        }
      </PaginationContext>
      <PaginationNextTrigger />
    </Pagination>
  )
}

export default PaginationDemo
