'use client'

import { type Project } from 'contentlayer/generated'
import Link from 'next/link'

import cn from '@/utils/cn'
import getIconByName from '@/utils/get-icon-by-name'

import Image from './mdx/image'

type ProjectCardProps = Project
type ProjectCardsProps = {
  projects: Project[]
}

const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
  for (const card of document.querySelectorAll('[data-id="project-card"]')) {
    const target = card as HTMLDivElement
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    target.style.setProperty('--mouse-x', `${x}px`)
    target.style.setProperty('--mouse-y', `${y}px`)
  }
}

const ProjectCards = (props: ProjectCardsProps) => {
  const { projects } = props

  return (
    // eslint-disable-next-line jsx-a11y/no-static-element-interactions
    <div
      className='group grid gap-4 sm:grid-cols-2'
      onMouseMove={handleMouseMove}
    >
      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  )
}

const ProjectCard = (props: ProjectCardProps) => {
  const { _id, name, image, description, techstack, slug } = props

  return (
    <Link
      key={_id}
      href={`/projects/${slug}`}
      className={cn(
        'relative flex flex-col space-y-3 rounded-2xl border p-6 group-hover:after:opacity-100',
        'hover:before:opacity-100',
        'before:absolute before:inset-0 before:-z-10 before:rounded-[inherit] before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(0,_0,_0,_0.06),transparent_40%)] before:opacity-0 before:transition-opacity before:duration-500 dark:before:bg-[radial-gradient(800px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(255,_255,_255,_0.06),transparent_40%)]',
        'after:absolute after:inset-0 after:-z-30 after:rounded-[inherit] after:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(0,0,0,_0.4),transparent_40%)] after:opacity-0 after:transition-opacity after:duration-500 dark:after:bg-[radial-gradient(600px_circle_at_var(--mouse-x)_var(--mouse-y),_rgba(255,_255,_255,_0.4),transparent_40%)]'
      )}
      data-id='project-card'
    >
      <div className='absolute inset-px -z-20 rounded-[inherit] bg-background' />
      <Image
        src={image}
        width={1200}
        height={630}
        alt={name}
        className='rounded-lg'
      />
      <div className='flex-1 px-2 py-4'>
        <div>
          <h2 className='text-2xl font-bold text-foreground'>{name}</h2>
          <div className='text-muted-foreground'>{description}</div>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {techstack.map((t) => {
            const { label } = t

            const Icon = getIconByName(label)

            return (
              <div
                key={label}
                className='flex items-center justify-center gap-1 rounded-full border px-3 py-2'
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

export default ProjectCards
