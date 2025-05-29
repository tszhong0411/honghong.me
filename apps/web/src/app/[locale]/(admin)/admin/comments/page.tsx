'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { DataTableSkeleton } from '@tszhong0411/ui'

import AdminPageHeader from '@/components/admin/admin-page-header'
import CommentsTable from '@/components/admin/comments-table'
import { useAdminCommentsParams } from '@/hooks/use-admin-comments-params'
import { useTRPC } from '@/trpc/client'

const Page = () => {
  const [params] = useAdminCommentsParams()
  const trpc = useTRPC()
  const { status, data } = useQuery(trpc.comments.getComments.queryOptions({ ...params }))
  const t = useTranslations()

  const isSuccess = status === 'success'
  const isLoading = status === 'pending'
  const isError = status === 'error'

  return (
    <div className='space-y-6'>
      <AdminPageHeader
        title={t('admin.page-header.comments.title')}
        description={t('admin.page-header.comments.description')}
      />
      {isLoading && <DataTableSkeleton columnCount={4} rowCount={10} />}
      {isError && <div>{t('admin.table.comments.failed-to-fetch-comments-data')}</div>}
      {isSuccess && (
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
