import { IconExternalLink } from '@tabler/icons-react'

import Image from './image'

type LinkCardProps = {
  href: string
  hostname: string
  title: string
}

const LinkCard = (props: LinkCardProps) => {
  const { href, hostname, title } = props

  return (
    <div className='not-prose flex justify-center'>
      <a
        href={href}
        className='my-8 flex items-center justify-center gap-4 rounded-lg border border-accent-2 p-4'
        rel='noopener noreferrer'
        target='_blank'
      >
        <Image
          src={`/images/website-icons/${hostname}.png`}
          className='rounded-lg'
          width={48}
          height={48}
          alt={hostname}
        />
        <div>
          <div>{title}</div>
          <div className='text-sm text-accent-5'>{href}</div>
        </div>
        <IconExternalLink size={22} className='text-accent-6' />
      </a>
    </div>
  )
}

export default LinkCard
