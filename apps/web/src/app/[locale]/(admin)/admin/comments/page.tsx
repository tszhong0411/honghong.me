'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { DataTableSkeleton } from '@tszhong0411/ui'

import AdminPageHeader from '@/components/admin/admin-page-header'
import CommentsTable from '@/components/admin/comments-table'
import { api } from '@/trpc/react'

const Page = () => {
  const { status, data } = api.comments.getComments.useQuery()
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
      {isLoading ? <DataTableSkeleton columnCount={3} searchableColumnsCount={2} /> : null}
      {isError ? <div>{t('admin.table.comments.failed-to-fetch-comments-data')}</div> : null}
      {isSuccess ? <CommentsTable data={data.comments} /> : null}
    </div>
  )
}

export default Page
