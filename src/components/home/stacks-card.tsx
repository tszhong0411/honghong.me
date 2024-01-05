'use client'

import { IconBolt } from '@tabler/icons-react'
import { motion } from 'framer-motion'
import React from 'react'

import cn from '@/utils/cn'

import {
  IconCloudflare,
  IconCSS,
  IconFigma,
  IconFirebase,
  IconGit,
  IconHTML,
  IconJavascript,
  IconJest,
  IconMarkdown,
  IconMySQL,
  IconNextJS,
  IconNodeJS,
  IconPostgres,
  IconPrisma,
  IconPython,
  IconReactJS,
  IconTailwindcss,
  IconTypescript,
  IconVite,
  IconVSCode
} from '../icons'

type InfiniteMovingCardsProps = {
  items: Array<{
    name: string
    icon: React.ReactNode
  }>
  direction?: 'left' | 'right'
}

const InfiniteMovingCards = (props: InfiniteMovingCardsProps) => {
  const { items, direction = 'left' } = props

  return (
    <div
      className={cn('overflow-hidden')}
      style={{
        maskImage:
          'linear-gradient(to right, transparent, white 20%, white 80%, transparent)'
      }}
    >
      <motion.ul
        className='flex w-max gap-4 py-4'
        animate={{
          x:
            direction === 'left'
              ? ['0', 'calc(-50% - 0.5rem)']
              : ['calc(-50% - 0.5rem)', '0']
        }}
        transition={{
          ease: 'linear',
          duration: 20,
          repeat: Number.POSITIVE_INFINITY
        }}
      >
        {[...Array.from({ length: 2 }).keys()].map(() =>
          items.map((item) => (
            <li className='[&>svg]:rounded-md' key={item.name}>
              {item.icon}
            </li>
          ))
        )}
      </motion.ul>
    </div>
  )
}

const StacksCard = () => {
  return (
    <div className='flex h-60 flex-col gap-2 overflow-hidden rounded-xl bg-background-lighter/60 p-4 shadow-card-border lg:p-6'>
      <div className='flex items-center gap-2'>
        <IconBolt fill='currentColor' size={18} />
        <h2 className='text-sm font-light'>Stacks</h2>
      </div>
      <InfiniteMovingCards
        items={[
          {
            name: 'HTML',
            icon: <IconHTML width='52' height='52' />
          },
          {
            name: 'CSS',
            icon: <IconCSS width='52' height='52' />
          },
          {
            name: 'Javascript',
            icon: <IconJavascript width='52' height='52' />
          },
          {
            name: 'Typescript',
            icon: <IconTypescript width='52' height='52' />
          },
          {
            name: 'Figma',
            icon: <IconFigma width='52' height='52' />
          },
          {
            name: 'Tailwindcss',
            icon: <IconTailwindcss width='52' height='52' />
          },
          {
            name: 'Next.js',
            icon: <IconNextJS width='52' height='52' />
          },
          {
            name: 'React.js',
            icon: <IconReactJS width='52' height='52' />
          },
          {
            name: 'Python',
            icon: <IconPython width='52' height='52' />
          },
          {
            name: 'Postgres',
            icon: <IconPostgres width='52' height='52' />
          }
        ]}
        direction='right'
      />
      <InfiniteMovingCards
        items={[
          {
            name: 'Prisma',
            icon: <IconPrisma width='52' height='52' />
          },
          {
            name: 'MySQL',
            icon: <IconMySQL width='52' height='52' />
          },
          {
            name: 'Firebase',
            icon: <IconFirebase width='52' height='52' />
          },
          {
            name: 'Git',
            icon: <IconGit width='52' height='52' />
          },
          {
            name: 'Vite',
            icon: <IconVite width='52' height='52' />
          },
          {
            name: 'VSCode',
            icon: <IconVSCode width='52' height='52' />
          },
          {
            name: 'Cloudflare',
            icon: <IconCloudflare width='52' height='52' />
          },
          {
            name: 'Markdown',
            icon: <IconMarkdown width='52' height='52' />
          },
          {
            name: 'Jest',
            icon: <IconJest width='52' height='52' />
          },
          {
            name: 'Node.js',
            icon: <IconNodeJS width='52' height='52' />
          }
        ]}
        direction='left'
      />
    </div>
  )
}

export default StacksCard
