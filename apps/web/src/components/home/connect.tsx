import { IconLink } from '@tabler/icons-react'
import { Link } from '@tszhong0411/ui'

import { SOCIAL_LINKS } from '@/config/links'

const Connect = () => {
  return (
    <div className='flex flex-col gap-6 rounded-xl bg-background-lighter/60 p-4 shadow-card-border lg:p-6'>
      <div className='flex items-center gap-2'>
        <IconLink size={18} />
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
              className='flex items-center gap-3 text-muted-foreground transition-colors duration-200 hover:text-foreground'
            >
              <Icon size={18} />
              <h2 className='font-light'>{title}</h2>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

export default Connect
