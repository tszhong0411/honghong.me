'use client'

import { ClockIcon } from 'lucide-react'
import useSWR from 'swr'

import { flags } from '@/lib/constants'
import { fetcher } from '@/lib/fetcher'
import { type Wakatime } from '@/types'

const CodingHours = () => {
  const { data: wakatimeData } = useSWR<Wakatime>(
    flags.stats ? '/api/wakatime' : null,
    fetcher
  )

  return (
    <div className='flex flex-col gap-6 rounded-xl p-4 shadow-feature-card dark:shadow-feature-card-dark lg:p-6'>
      <div className='flex items-center gap-2'>
        <ClockIcon className='size-[18px]' />
        <h2 className='text-sm font-light'>Coding hours</h2>
      </div>
      <div className='flex grow items-center justify-center font-title text-4xl font-semibold'>
        {wakatimeData ? Math.round(wakatimeData.seconds / 60 / 60) : '--'} hrs
      </div>
    </div>
  )
}

export default CodingHours
