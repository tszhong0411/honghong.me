'use client'

import { flags } from '@tszhong0411/env'
import { Link } from '@tszhong0411/ui'
import { StarIcon } from 'lucide-react'

import { FOOTER_LINKS } from '@/config/links'
import { api } from '@/trpc/react'

import NowPlaying from './now-playing'

const Footer = () => {
  const { status, data } = api.github.getRepoStars.useQuery(undefined, {
    staleTime: 1000 * 60 * 60
  })

  return (
    <footer className='bg-background/30 relative mx-auto mb-6 flex max-w-5xl flex-col rounded-2xl p-8 shadow-sm saturate-100 backdrop-blur-[10px]'>
      {flags.spotify ? <NowPlaying /> : null}
      <div className='mt-12 grid grid-cols-2 sm:grid-cols-3'>
        {FOOTER_LINKS.map((list) => (
          <div key={list.id} className='mb-10 flex flex-col items-start gap-4 pr-4'>
            {list.links.map((link) => {
              const { href, text } = link

              return (
                <Link key={href} href={href} variant='muted'>
                  {text}
                </Link>
              )
            })}
          </div>
        ))}
      </div>
      <div className='mt-20 flex items-center justify-between text-sm'>
        <div>&copy; {new Date().getFullYear()} Hong</div>
        <Link
          href='https://git.new/honghong-me'
          className='flex items-center justify-center overflow-hidden rounded-md border'
        >
          <div className='bg-muted flex h-8 items-center gap-2 border-r px-2'>
            <StarIcon className='size-4' />
            <span className='font-medium'>Star</span>
          </div>
          <div className='bg-background flex h-8 items-center px-3'>
            {status === 'pending' ? '--' : null}
            {status === 'error' ? 'Error' : null}
            {status === 'success'
              ? Intl.NumberFormat('en', {
                  notation: 'compact',
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 1
                }).format(data)
              : null}
          </div>
        </Link>
      </div>
    </footer>
  )
}

export default Footer
