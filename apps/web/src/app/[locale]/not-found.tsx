'use client'

import type { Metadata } from 'next'

import { useTranslations } from '@tszhong0411/i18n/client'

import GoToHomepage from '@/components/go-to-homepage'
import MainLayout from '@/components/main-layout'

export const metadata: Metadata = {
  title: '404'
}

const NotFound = () => {
  const t = useTranslations()

  return (
    <MainLayout>
      <div className='mb-40 mt-52 flex flex-col items-center justify-center gap-12'>
        <h1 className='text-center text-6xl font-bold'>{t('not-found')}</h1>
        <GoToHomepage />
      </div>
    </MainLayout>
  )
}

export default NotFound
