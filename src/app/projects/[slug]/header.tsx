'use client'

import { IconArrowUpRight } from '@tabler/icons-react'
import { type Project } from 'contentlayer/generated'
import { motion } from 'framer-motion'

import { buttonVariants } from '@/components/ui'
import site from '@/config/site'
import cn from '@/utils/cn'

const animation = {
  hide: {
    x: -30,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1
  }
}

type HeaderProps = Project

const Header = (props: HeaderProps) => {
  const { name, description, homepage, github, repo } = props

  return (
    <div className='space-y-8 pt-10'>
      <motion.div
        className='flex items-center gap-3'
        initial={animation.hide}
        animate={animation.show}
      >
        <div className='flex flex-col gap-3'>
          <div className='text-2xl font-bold'>{name}</div>
          <div>{description}</div>
        </div>
      </motion.div>
      <motion.div
        className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'
        initial={animation.hide}
        animate={animation.show}
        transition={{ delay: 0.1 }}
      >
        {homepage && (
          <a
            target='_blank'
            rel='noopener noreferrer'
            href={homepage}
            className={cn(buttonVariants(), 'group')}
          >
            Visit Website
            <IconArrowUpRight
              size={20}
              className='ml-2 transition-transform duration-200 group-hover:-rotate-12'
            />
          </a>
        )}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={github}
          className={cn(buttonVariants(), 'group')}
        >
          {site.githubUsername}/{repo}
          <IconArrowUpRight
            size={20}
            className='ml-2 transition-transform duration-200 group-hover:-rotate-12'
          />
        </a>
      </motion.div>
    </div>
  )
}
export default Header
