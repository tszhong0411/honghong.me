'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'

import AdminPageHeader from '@/components/admin/admin-page-header'
import UsersTable from '@/components/admin/users-table'
import { Skeleton } from '@/components/ui/skeleton'
import { useTRPC } from '@/trpc/client'

const Page = () => {
  const trpc = useTRPC()
  const { status, data } = useQuery(trpc.users.getUsers.queryOptions())
  const t = useTranslations()

  const isSuccess = status === 'success'
  const isLoading = status === 'pending'
  const isError = status === 'error'

  return (
    <div className='space-y-6'>
      <AdminPageHeader
        title={t('admin.page-header.users.title')}
        description={t('admin.page-header.users.description')}
      />
      {isLoading ? <Skeleton className='h-[500px] w-full' /> : null}
      {isError ? <div>{t('admin.table.users.failed-to-fetch-users-data')}</div> : null}
      {isSuccess ? <UsersTable data={data.users} /> : null}
    </div>
  )
}

export default Page
