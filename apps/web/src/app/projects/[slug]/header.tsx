'use client'

import { IconArrowUpRight } from '@tabler/icons-react'
import { buttonVariants, Link } from '@tszhong0411/ui'
import { cn } from '@tszhong0411/utils'
import { motion } from 'framer-motion'

import { GITHUB_USERNAME } from '@/lib/constants'
import { type ProjectMetadata } from '@/lib/mdx'

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

type HeaderProps = {
  metadata: ProjectMetadata
}

const Header = (props: HeaderProps) => {
  const {
    metadata: { name, description, homepage, github }
  } = props

  const repo = github.split('/').pop()

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
          <Link href={homepage} className={cn(buttonVariants(), 'group')}>
            Visit Website
            <IconArrowUpRight
              size={20}
              className='ml-2 transition-transform duration-200 group-hover:-rotate-12'
            />
          </Link>
        )}
        <Link href={github} className={cn(buttonVariants(), 'group')}>
          {GITHUB_USERNAME}/{repo}
          <IconArrowUpRight
            size={20}
            className='ml-2 transition-transform duration-200 group-hover:-rotate-12'
          />
        </Link>
      </motion.div>
    </div>
  )
}
export default Header
