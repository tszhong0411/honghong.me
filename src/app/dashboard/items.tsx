'use client'

import {
  IconBrandGithub,
  IconBrandYoutube,
  IconPencil,
} from '@tabler/icons-react'
import { useQuery } from '@tanstack/react-query'
import CountUp from 'react-countup'

import Skeleton from '@/components/Skeleton'

import { APIResponse } from '@/types'

type CardProps = {
  icon: React.ReactNode
  title: string
  link: string
  url: string
  queryKey: string
}

const Card = (props: CardProps) => {
  const { icon, title, link, url, queryKey } = props
  const { isLoading, isError, data } = useQuery<APIResponse>({
    queryKey: ['dashboard', queryKey, url],
    queryFn: () =>
      fetch(url, {
        cache: 'no-store',
      }).then((res) => res.json()),
  })

  return (
    <a
      target='_blank'
      rel='noopener noreferrer'
      href={link}
      className='flex flex-col gap-2 rounded-lg border border-accent-2 p-4 transition-colors duration-300 hover:bg-accent-1'
    >
      <div className='flex items-center gap-1'>
        {icon}
        <div className='text-sm font-bold'>{title}</div>
      </div>
      {!isLoading && !isError ? (
        <div className='text-4xl font-black text-hong-fg'>
          <CountUp start={0} end={data.count} separator=',' />
        </div>
      ) : (
        <Skeleton className='h-10 w-1/3' />
      )}
    </a>
  )
}

const Items = () => {
  return (
    <>
      <div className='mb-4 grid gap-4 sm:grid-cols-2'>
        <Card
          icon={<IconBrandYoutube />}
          title='YouTube 訂閱者'
          link='https://youtube.com/@tszhong0411'
          url='/dashboard/youtube/subscribers'
          queryKey='youtube-subscribers'
        />
        <Card
          icon={<IconBrandYoutube />}
          title='YouTube 觀看次數'
          link='https://youtube.com/@tszhong0411'
          url='/dashboard/youtube/views'
          queryKey='youtube-views'
        />
        <Card
          icon={<IconBrandGithub />}
          title='GitHub 追隨者'
          link='https://github.com/tszhong0411'
          url='/dashboard/github/followers'
          queryKey='github-followers'
        />
        <Card
          icon={<IconBrandGithub />}
          title='GitHub stars'
          link='https://github.com/tszhong0411'
          url='/dashboard/github/stars'
          queryKey='github-stars'
        />
      </div>
      <Card
        icon={<IconPencil />}
        title='Blog 總瀏覽次數'
        link='https://honghong.me'
        url='/views'
        queryKey='blog-views'
      />
    </>
  )
}

export default Items
