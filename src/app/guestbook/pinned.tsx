import { IconPinnedFilled } from '@tabler/icons-react'
import React from 'react'

const Pinned = () => {
  return (
    <div className='relative mb-12 overflow-hidden rounded-lg border px-4 py-6'>
      <div className='absolute inset-0 -z-10 rounded-[calc(var(--radius)-1px)] bg-[linear-gradient(119deg,_rgba(143,152,242,1)_0%,_rgba(95,167,225,1)_30%,_rgba(206,133,247,1)_47%,_rgba(235,147,186,1)_69%,_rgba(190,188,251,1)_80%)] opacity-80 dark:bg-[linear-gradient(119deg,_rgba(75,87,196,1)_0%,_rgba(31,133,206,1)_30%,_rgba(125,20,166,1)_42%,_rgba(134,15,60,1)_63%,_rgba(18,8,45,1)_73%)]' />
      <div className='mb-3 flex items-center gap-2'>
        <IconPinnedFilled className='rotate-45' />
        Pinned
      </div>
      <div>
        Hey there! Thanks for visiting my website. If you have a moment,
        I&apos;d love to hear your thoughts on my work. Please log in with your
        GitHub account to leave a comment. Thanks!
      </div>
    </div>
  )
}

export default Pinned
