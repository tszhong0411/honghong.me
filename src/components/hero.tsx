'use client'

import Image from '@/components/mdx/image'
import { HERO_LINKS } from '@/config/links'

const Hero = () => {
  return (
    <div className='space-y-6 md:my-16'>
      <div className='flex flex-col-reverse gap-8 md:flex-row md:justify-between'>
        <div className='space-y-4 md:max-w-lg'>
          <h1 className='text-2xl font-bold text-foreground sm:text-4xl'>
            Hong
          </h1>
          <h2 className='font-medium text-muted-foreground sm:text-lg'>
            17 y/o • Student • Full-stack Developer
          </h2>
          <p className='sm:text-lg'>
            I am a student, currently learning web development skills such as
            Next.js, Node.js, Prisma, and database management. I can feel a
            sense of accomplishment when my code is recognized and appreciated.
          </p>
        </div>
        <div className='relative h-20 w-20 md:h-28 md:w-28'>
          <Image
            src='/images/avatar.png'
            className='rounded-full'
            width={112}
            height={112}
            alt='Hong'
            loading='eager'
            priority
          />
          <div className='absolute inset-0 -z-10 bg-gradient-to-tl from-purple-700 to-orange-700 opacity-0 blur-2xl md:opacity-50' />
        </div>
      </div>
      <div className='flex gap-6'>
        {HERO_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.href}
            aria-label={link.label}
            target='_blank'
            rel='noopener noreferrer'
          >
            {link.icon}
          </a>
        ))}
      </div>
    </div>
  )
}

export default Hero
