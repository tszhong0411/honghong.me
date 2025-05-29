'use client'

import { useQuery } from '@tanstack/react-query'
import { useTranslations } from '@tszhong0411/i18n/client'
import { Skeleton } from '@tszhong0411/ui'

import AdminPageHeader from '@/components/admin/admin-page-header'
import UsersTable from '@/components/admin/users-table'
import { useAdminUsersParams } from '@/hooks/use-admin-users-params'
import { useTRPC } from '@/trpc/client'

const Page = () => {
  const [params] = useAdminUsersParams()
  const trpc = useTRPC()
  const { status, data } = useQuery(trpc.users.getUsers.queryOptions({ ...params }))
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
      {isLoading && <Skeleton className='h-[500px] w-full' />}
      {isError && <div>{t('admin.table.users.failed-to-fetch-users-data')}</div>}
      {isSuccess && (
        <UsersTable data={data.users} pageCount={data.pageCount} roleCounts={data.roleCounts} />
      )}
    </div>
  )
}

export default Page
