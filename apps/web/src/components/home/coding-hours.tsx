'use client'

import { flags } from '@tszhong0411/env'
import { ClockIcon } from 'lucide-react'

import { api } from '@/trpc/react'

const CodingHours = () => {
  const { status, data } = api.wakatime.get.useQuery(undefined, {
    enabled: flags.stats
  })

  return (
    <div className='shadow-feature-card dark:shadow-feature-card-dark flex flex-col gap-6 rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <ClockIcon className='size-[18px]' />
        <h2 className='text-sm font-light'>Coding hours</h2>
      </div>
      <div className='font-title flex grow items-center justify-center text-4xl font-semibold'>
        {status === 'pending' ? '--' : null}
        {status === 'error' ? 'Error' : null}
        {status === 'success' ? Math.round(data.seconds / 60 / 60) : null} hrs
      </div>
    </div>
  )
}

export default CodingHours
