import { useTranslations } from '@tszhong0411/i18n/client'
import { Skeleton } from '@tszhong0411/ui'

import PageTitle from '@/components/page-title'

import Pinned from './pinned'

const Loading = () => {
  const t = useTranslations()
  const title = t('guestbook.title')
  const description = t('guestbook.description')

  return (
    <>
      <PageTitle title={title} description={description} />
      <div className='mx-auto max-w-xl space-y-10'>
        <Pinned />
        <div className='flex gap-3'>
          <Skeleton className='size-10 shrink-0 rounded-full' />
          <div className='w-full space-y-4'>
            <Skeleton className='h-20' />
            <Skeleton className='ml-auto h-10 w-40' />
          </div>
        </div>
      </div>
    </>
  )
}

export default Loading
