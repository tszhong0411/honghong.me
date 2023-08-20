'use client'

import { Project } from 'contentlayer/generated'
import { useMotionTemplate, useMotionValue } from 'framer-motion'
import { motion } from 'framer-motion'
import Link from 'next/link'

import getIconByName from '@/utils/get-icon-by-name'

import Image from './mdx/image'

type ProjectCardProps = Project

const ProjectCard = (props: ProjectCardProps) => {
  const { _id, name, image, description, techstack, slug } = props

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  return (
    <Link
      key={_id}
      href={`/projects/${slug}`}
      className='group relative flex flex-col rounded-lg border border-accent-2 p-4 transition-all duration-150 hover:scale-105'
      onMouseMove={(e) => {
        const { left, top } = e.currentTarget.getBoundingClientRect()

        mouseX.set(e.clientX - left)
        mouseY.set(e.clientY - top)
      }}
    >
      <motion.div
        className='pointer-events-none absolute -inset-px rounded-xl opacity-0 transition duration-300 [--spotlight:rgba(255,255,255,0.15)] group-hover:opacity-100'
        style={{
          background: useMotionTemplate`
            radial-gradient(
              650px circle at ${mouseX}px ${mouseY}px,
              var(--spotlight),
              transparent 80%
            )
          `,
        }}
      />
      <Image
        src={image}
        width={1200}
        height={630}
        alt={name}
        className='rounded-lg'
      />
      <div className='flex-1 px-2 py-4'>
        <div>
          <h2 className='text-2xl font-bold text-accent-fg'>{name}</h2>
          <div className='text-accent-5'>{description}</div>
        </div>
        <div className='mt-[5px] flex flex-wrap gap-[7px]'>
          {techstack.map((techstack) => {
            const { label } = techstack

            const Icon = getIconByName(label)

            return (
              <div
                key={label}
                className='flex items-center justify-center gap-1 rounded-full border border-accent-2 px-3 py-2'
              >
                <Icon strokeWidth={1.5} size={16} />
                <div className='text-xs leading-4'>{label}</div>
              </div>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard
