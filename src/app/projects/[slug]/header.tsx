'use client'

import { IconBrandGithub, IconHome } from '@tabler/icons-react'
import { Project } from 'contentlayer/generated'
import { motion } from 'framer-motion'

import getIconByName from '@/lib/get-icon-by-name'

import { site } from '@/config/site'

const animation = {
  hide: {
    x: -30,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
}

type HeaderProps = Project

const Header = (props: HeaderProps) => {
  const { name, description, icon, homepage, github, repo } = props

  const Icon = getIconByName(icon)

  return (
    <div className='space-y-4'>
      <motion.div
        className='flex items-center gap-3'
        initial={animation.hide}
        animate={animation.show}
      >
        <Icon size={40} />
        <div className='flex flex-col'>
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
            className='flex items-center'
          >
            <IconHome size={20} className='mr-2 inline-block' />
            {homepage}
          </a>
        )}
        <a
          target='_blank'
          rel='noopener noreferrer'
          href={github}
          className='flex items-center'
        >
          <IconBrandGithub size={20} className='mr-2 inline-block' />
          {site.githubUsername}/{repo}
        </a>
      </motion.div>
    </div>
  )
}
export default Header
