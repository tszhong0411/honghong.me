'use client'

import { IconClock } from '@tabler/icons-react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'
import { type Wakatime } from '@/types'

const CodingHours = () => {
  const { data: wakatimeData } = useSWR<Wakatime>('/api/wakatime', fetcher)

  return (
    <div className='flex flex-col gap-6 rounded-xl bg-background-lighter/60 p-4 shadow-card-border lg:p-6'>
      <div className='flex items-center gap-2'>
        <IconClock size={18} />
        <h2 className='text-sm font-light'>Coding hours</h2>
      </div>
      <div className='flex grow items-center justify-center font-calcom text-4xl font-bold text-zinc-200'>
        {wakatimeData ? Math.round(wakatimeData.seconds / 60 / 60) : '--'} hrs
      </div>
    </div>
  )
}

export default CodingHours
