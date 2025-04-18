'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'

import AdminPageHeader from '@/components/admin/admin-page-header'
import CommentsTable from '@/components/admin/comments-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useTRPC } from '@/trpc/client'

const Page = () => {
  const trpc = useTRPC()
  const { status, data } = useQuery(trpc.comments.getComments.queryOptions())
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
      {isLoading ? <Skeleton className='h-[500px] w-full' /> : null}
      {isError ? <div>{t('admin.table.comments.failed-to-fetch-comments-data')}</div> : null}
      {isSuccess ? <CommentsTable data={data.comments} /> : null}
    </div>
  )
}

export default Page
