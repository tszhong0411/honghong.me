import { DataTableSkeleton } from '@tszhong0411/ui'
import { getTranslations } from 'next-intl/server'
import { Suspense } from 'react'

import AdminPageHeader from '@/components/admin/admin-page-header'
import CommentsTable from '@/components/admin/comments-table'
import { searchParamsCaches } from '@/lib/search-params'
import { HydrateClient, prefetch, trpc } from '@/trpc/server'

type PageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>
}

const Page = async (props: PageProps) => {
  const searchParams = await props.searchParams
  const params = searchParamsCaches.adminComments.parse(searchParams)
  prefetch(trpc.comments.getComments.queryOptions(params))

  const t = await getTranslations()

  return (
    <HydrateClient>
      <div className='space-y-6'>
        <AdminPageHeader
          title={t('admin.page-header.comments.title')}
          description={t('admin.page-header.comments.description')}
        />
        <Suspense fallback={<DataTableSkeleton columnCount={4} rowCount={10} filterCount={3} />}>
          <CommentsTable />
        </Suspense>
      </div>
    </HydrateClient>
  )
}

export default Page
