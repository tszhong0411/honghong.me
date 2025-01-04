'use client'

import { useTranslations } from '@tszhong0411/i18n/client'
import type { Metadata } from 'next'

import GoToHomepage from '@/components/go-to-homepage'

export const metadata: Metadata = {
  title: '404'
}

const NotFound = () => {
  const t = useTranslations()

  return (
    <div className='mb-40 mt-52 flex flex-col items-center justify-center gap-12'>
      <h1 className='text-center text-6xl font-bold'>{t('not-found')}</h1>
      <GoToHomepage />
    </div>
  )
}

export default NotFound
