'use client'

import { useTranslations } from '@tszhong0411/i18n/client'

import MainLayout from '@/components/main-layout'
import { Button } from '@/components/ui/button'

type PageProps = {
  error: Error & { digest?: string }
  reset: () => void
}

const Page = (props: PageProps) => {
  const { error, reset } = props
  const t = useTranslations()

  return (
    <MainLayout>
      <div className='space-y-4 px-2 py-8'>
        <h1 className='text-2xl font-bold'>{t('error.something-went-wrong')}</h1>
        <Button onClick={reset}>{t('error.try-again')}</Button>
        <p className='break-words rounded-md bg-zinc-100 p-4 dark:bg-zinc-800'>{error.message}</p>
      </div>
    </MainLayout>
  )
}

export default Page
