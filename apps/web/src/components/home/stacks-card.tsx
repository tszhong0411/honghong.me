'use client'

import { IconBolt } from '@tabler/icons-react'
import { Marquee } from '@tszhong0411/ui'
import React from 'react'

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

const StacksCard = () => {
  return (
    <div className='flex h-60 flex-col gap-2 overflow-hidden rounded-xl bg-background-lighter/60 p-4 shadow-card-border lg:p-6'>
      <div className='flex items-center gap-2'>
        <IconBolt fill='currentColor' size={18} />
        <h2 className='text-sm font-light'>Stacks</h2>
      </div>
      <Marquee className='py-4' fade pauseOnHover>
        <IconHTML width='52' height='52' />
        <IconCSS width='52' height='52' />
        <IconJavascript width='52' height='52' />
        <IconTypescript width='52' height='52' />
        <IconFigma width='52' height='52' />
        <IconTailwindcss width='52' height='52' />
        <IconNextJS width='52' height='52' />
        <IconReactJS width='52' height='52' />
        <IconPython width='52' height='52' />
        <IconPostgres width='52' height='52' />
      </Marquee>
      <Marquee className='py-4' reverse fade pauseOnHover>
        <IconPrisma width='52' height='52' />
        <IconMySQL width='52' height='52' />
        <IconFirebase width='52' height='52' />
        <IconGit width='52' height='52' />
        <IconVite width='52' height='52' />
        <IconVSCode width='52' height='52' />
        <IconCloudflare width='52' height='52' />
        <IconMarkdown width='52' height='52' />
        <IconJest width='52' height='52' />
        <IconNodeJS width='52' height='52' />
      </Marquee>
    </div>
  )
}

export default StacksCard
