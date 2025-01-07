'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import { DataTableSkeleton } from '@tszhong0411/ui'

import UsersTable from '@/components/admin/users-table'
import { api } from '@/trpc/react'

const Page = () => {
  const { status, data } = api.users.getUsers.useQuery()
  const t = useTranslations()

  const isLoading = status === 'pending'
  const isError = status === 'error'

  if (isLoading) {
    return (
      <DataTableSkeleton columnCount={3} searchableColumnsCount={1} filterableColumnCount={1} />
    )
  }

  if (isError) {
    return <div>{t('admin.table.users.failed-to-fetch-users-data')}</div>
  }

  return <UsersTable data={data.users} />
}

export default Page
