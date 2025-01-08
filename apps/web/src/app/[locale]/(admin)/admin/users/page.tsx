'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { DataTableSkeleton } from '@tszhong0411/ui'

import AdminPageHeader from '@/components/admin/admin-page-header'
import UsersTable from '@/components/admin/users-table'
import { api } from '@/trpc/react'

const Page = () => {
  const { status, data } = api.users.getUsers.useQuery()
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
      {isLoading ? (
        <DataTableSkeleton columnCount={3} searchableColumnsCount={1} filterableColumnCount={1} />
      ) : null}
      {isError ? <div>{t('admin.table.users.failed-to-fetch-users-data')}</div> : null}
      {isSuccess ? <UsersTable data={data.users} /> : null}
    </div>
  )
}

export default Page
