import { PinIcon } from 'lucide-react'
import * as React from 'react'

const Pinned = () => {
  return (
    <div className='relative mb-12 overflow-hidden rounded-lg px-4 py-6'>
      <div className='absolute inset-0 -z-10 rounded-lg bg-pinned opacity-50 dark:bg-pinned-dark' />
      <div className='mb-3 flex items-center gap-2'>
        <PinIcon className='size-4 rotate-45' />
        Pinned
      </div>
      <div>
        Hey there! Thanks for visiting my website. If you have a moment, I'd
        love to hear your thoughts on my work. Please log in with your account
        to leave a comment. Thanks!
      </div>
    </div>
  )
}

export default Pinned
