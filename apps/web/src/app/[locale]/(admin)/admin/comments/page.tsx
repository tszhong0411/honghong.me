'use client'

import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { DataTableSkeleton } from '@tszhong0411/ui'
import { useTranslations } from 'next-intl'

import AdminPageHeader from '@/components/admin/admin-page-header'
import CommentsTable from '@/components/admin/comments-table'
import { useAdminCommentsParams } from '@/hooks/use-admin-comments-params'
import { useTRPC } from '@/trpc/client'

const Page = () => {
  const [params] = useAdminCommentsParams()
  const trpc = useTRPC()
  const { data, isLoading, isError } = useQuery(
    trpc.comments.getComments.queryOptions(
      { ...params },
      {
        placeholderData: keepPreviousData
      }
    )
  )
  const t = useTranslations()

  const isInitialLoading = isLoading && !data

  return (
    <div className='space-y-6'>
      <AdminPageHeader
        title={t('admin.page-header.comments.title')}
        description={t('admin.page-header.comments.description')}
      />
      {isLoading && <DataTableSkeleton columnCount={4} rowCount={10} filterCount={3} />}
      {isError && <div>{t('admin.table.comments.failed-to-fetch-comments-data')}</div>}
      {!isInitialLoading && data && (
        <CommentsTable
          data={data.comments}
          pageCount={data.pageCount}
          typeCounts={data.typeCounts}
        />
      )}
    </div>
  )
}

export default Page
