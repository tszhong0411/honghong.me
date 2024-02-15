'use client'

import { Link } from '@tszhong0411/ui'

import { type ProjectMetadata } from '@/lib/mdx'

import Image from './mdx/image'

type ProjectCardProps = ProjectMetadata
type ProjectCardsProps = {
  projects: ProjectMetadata[]
}

const ProjectCards = (props: ProjectCardsProps) => {
  const { projects } = props

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {projects.map((project) => (
        <ProjectCard key={project.slug} {...project} />
      ))}
    </div>
  )
}

const ProjectCard = (props: ProjectCardProps) => {
  const { name, description, techstack, slug } = props

  return (
    <Link
      href={`/projects/${slug}`}
      className='group rounded-xl bg-background-lighter/60 px-2 py-4 shadow-card-border transition-colors duration-200 hover:bg-background-lighter'
    >
      <Image
        src={`/images/projects/${slug}/cover.png`}
        width={1280}
        height={832}
        imageClassName='transition-transform duration-200 group-hover:scale-105'
        alt={name}
        className='rounded-lg'
      />
      <div className='flex-1 px-2 py-4'>
        <div className='space-y-2'>
          <h2 className='text-2xl font-bold'>{name}</h2>
          <div className='text-muted-foreground'>{description}</div>
        </div>
        <div className='mt-4 flex flex-wrap gap-2'>
          {techstack.map((t) => {
            const { label } = t

            return (
              <div
                key={label}
                className='rounded-full border bg-zinc-900 px-3 py-2 text-xs leading-4'
              >
                {label}
              </div>
            )
          })}
        </div>
      </div>
    </Link>
  )
}

export default ProjectCards
