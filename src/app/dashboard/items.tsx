'use client'

import {
  IconBrandGithub,
  IconBrandYoutube,
  IconClock,
  IconPencil,
} from '@tabler/icons-react'
import { IconUser } from '@tabler/icons-react'
import dayjs from 'dayjs'
import React from 'react'
import useSWR from 'swr'

import fetcher from '@/lib/fetcher'

import Skeleton from '@/components/Skeleton'

import { GithubData, Likes, Views, WakatimeData, YouTubeData } from '@/types'

type Card = {
  icon: React.ReactNode
  title: string
  link: string
  value: number | string | undefined
}

const Items = () => {
  const { data: youtubeData } = useSWR<YouTubeData>('/api/youtube', fetcher)
  const { data: githubData } = useSWR<GithubData>('/api/github', fetcher)
  const { data: likesData } = useSWR<Likes>('/api/likes', fetcher)
  const { data: viewsData } = useSWR<Views>('/api/views', fetcher)
  const { data: wakatimeData } = useSWR<WakatimeData>('/api/wakatime', fetcher)

  const getAge = () =>
    (
      dayjs().diff('2006-04-11', 'milliseconds') /
      (365.25 * 24 * 60 * 60 * 1000)
    ).toFixed(9)

  const [age, setAge] = React.useState(getAge())
  const [mounted, setMounted] = React.useState(false)

  setInterval(() => {
    setAge(getAge())
  }, 10)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const data: Card[] = [
    {
      title: 'My Age',
      link: 'https://honghong.me/about',
      value: age,
      icon: <IconUser />,
    },
    {
      title: 'Coding Hours',
      link: 'https://wakatime.com/@tszhong0411',
      value: `${Math.round((wakatimeData?.seconds as number) / 60 / 60)} hrs`,
      icon: <IconClock />,
    },
    {
      title: 'YouTube Subscribers',
      link: 'https://youtube.com/@tszhong0411',
      value: youtubeData?.subscribers,
      icon: <IconBrandYoutube />,
    },
    {
      title: 'YouTube Views',
      link: 'https://youtube.com/@tszhong0411',
      value: youtubeData?.views,
      icon: <IconBrandYoutube />,
    },
    {
      title: 'GitHub Followers',
      link: 'https://github.com/tszhong0411',
      value: githubData?.followers,
      icon: <IconBrandGithub />,
    },
    {
      title: 'GitHub Stars',
      link: 'https://github.com/tszhong0411',
      value: githubData?.stars,
      icon: <IconBrandGithub />,
    },
    {
      title: 'Blog Total Views',
      link: 'https://honghong.me',
      value: viewsData?.views,
      icon: <IconPencil />,
    },
    {
      title: 'Blog Total Likes',
      link: 'https://honghong.me',
      value: likesData?.likes,
      icon: <IconPencil />,
    },
  ]

  return (
    <>
      <div className='mb-4 grid gap-4 sm:grid-cols-2'>
        {mounted &&
          data.map((item) => {
            const { icon, link, title, value } = item

            return (
              <a
                key={title}
                target='_blank'
                rel='noopener noreferrer'
                href={link}
                className='flex flex-col gap-2 rounded-lg border border-accent-2 p-4 transition-colors duration-300 hover:bg-accent-1'
              >
                <div className='flex items-center gap-1'>
                  {icon}
                  <div className='text-sm font-bold'>{title}</div>
                </div>
                <div className='text-4xl font-black text-hong-fg'>
                  {value ? value : <Skeleton className='h-10' />}
                </div>
              </a>
            )
          })}
      </div>
    </>
  )
}

export default Items
