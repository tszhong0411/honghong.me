'use client'

import CountUp from 'react-countup'

import Skeleton from '@/components/Skeleton'

type CardProps = {
  icon: React.ReactNode
  title: string
  href: string
  data: number
}

const Card = (props: CardProps) => {
  const { icon, title, href, data } = props

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={href}
      className='flex flex-col gap-2 rounded-lg border border-accent-2 p-4 transition-colors duration-300 hover:bg-accent-1'
    >
      <div className='flex items-center gap-1'>
        {icon}
        <div className='text-sm font-bold'>{title}</div>
      </div>
      {data > 0 ? (
        <div className='text-4xl font-black text-hong-fg'>
          <CountUp start={0} end={data} separator=',' />
        </div>
      ) : (
        <Skeleton className='h-10 w-1/3' />
      )}
    </a>
  )
}

export default Card
