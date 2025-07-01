'use client'

import { useQuery } from '@tanstack/react-query'
import { flags } from '@tszhong0411/env'
import { useTranslations } from '@tszhong0411/i18n/client'
import { ClockIcon } from 'lucide-react'

import { orpc } from '@/orpc/client'

const CodingHours = () => {
  const { status, data } = useQuery({
    ...orpc.stats.wakatime.queryOptions(),
    enabled: flags.stats
  })
  const t = useTranslations()

  return (
    <div className='shadow-feature-card flex flex-col gap-6 rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <ClockIcon className='size-[18px]' />
        <h2 className='text-sm'>{t('homepage.about-me.coding-hours')}</h2>
      </div>
      <div className='flex grow items-center justify-center text-4xl font-semibold'>
        {status === 'pending' && '--'}
        {status === 'error' && t('common.error')}
        {status === 'success' && Math.round(data.seconds / 60 / 60)} hrs
      </div>
    </div>
  )
}

export default CodingHours
