import { Link } from '@tszhong0411/ui'
import { LinkIcon } from 'lucide-react'

import { SOCIAL_LINKS } from '@/config/links'

const Connect = () => {
  return (
    <div className='shadow-feature-card dark:shadow-feature-card-dark flex flex-col gap-6 rounded-xl p-4 lg:p-6'>
      <div className='flex items-center gap-2'>
        <LinkIcon className='size-[18px]' />
        <h2 className='text-sm font-light'>Connect</h2>
      </div>
      <div className='flex flex-col gap-4 px-2'>
        {SOCIAL_LINKS.map((link) => {
          const { href, title, icon } = link

          const Icon = icon

          return (
            <Link
              key={href}
              href={href}
              className='text-muted-foreground hover:text-foreground flex items-center gap-3 transition-colors'
            >
              <Icon className='size-[18px]' />
              <h2 className='font-light'>{title}</h2>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Connect
