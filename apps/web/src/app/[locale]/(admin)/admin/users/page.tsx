import { DataTableSkeleton } from '@tszhong0411/ui'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import AdminPageHeader from '@/components/admin/admin-page-header'
import UsersTable from '@/components/admin/users-table'
import { searchParamsCaches } from '@/lib/search-params'
import { prefetch, trpc } from '@/trpc/server'

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const Page = async (props: PageProps) => {
  const searchParams = await props.searchParams
  const params = searchParamsCaches.adminUsers.parse(searchParams)
  prefetch(trpc.users.getUsers.queryOptions(params))

  const t = await getTranslations()

  return (
    <div className='space-y-6'>
      <AdminPageHeader
        title={t('admin.page-header.users.title')}
        description={t('admin.page-header.users.description')}
      />
      <Suspense fallback={<DataTableSkeleton columnCount={4} rowCount={10} filterCount={3} />}>
        <UsersTable />
      </Suspense>
    </div>
  )
}

export default Page
