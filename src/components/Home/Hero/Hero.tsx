import Image from '@/components/MDXComponents/Image'

import { HERO_LINKS } from '@/config/links'

const Hero = () => {
  return (
    <div className='space-y-6 md:my-16'>
      <div className='flex flex-col-reverse gap-8 md:flex-row md:justify-between'>
        <div className='space-y-4 md:max-w-lg'>
          <h1 className='text-4xl font-bold text-hong-fg'>小康</h1>
          <h2 className='text-lg font-medium text-accent-5'>
            16 yrs • Student • Full-stack Web Development Student
          </h2>
          <p className='text-lg'>
            我是一名學生，目前正在學習 Web 開發技能，例如 Next.js, Node.js,
            Prisma
            和數據庫管理。當我的程式碼被認可和讚賞時，我會感到很有成就感。
          </p>
        </div>
        <div className='h-20 w-20 md:h-28 md:w-28'>
          <Image
            src='/static/images/avatar.png'
            width={112}
            height={112}
            alt='小康'
            rounded='rounded-full'
            loading='eager'
            priority
          />
        </div>
      </div>
      <div className='flex gap-6'>
        {HERO_LINKS.map((link, i) => (
          <a key={i} href={link.href} target='_blank' rel='noopener noreferrer'>
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Hero
