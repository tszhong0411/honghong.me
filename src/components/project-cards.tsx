'use client'

import { type Project } from 'contentlayer/generated'
import Link from 'next/link'

import useGlowPointer from '@/hooks/use-glow-pointer'

import GlowCard from './glow-card'
import Image from './mdx/image'

type ProjectCardProps = Project
type ProjectCardsProps = {
  projects: Project[]
}

const ProjectCards = (props: ProjectCardsProps) => {
  const { projects } = props
  useGlowPointer()

  return (
    <div className='grid gap-4 md:grid-cols-2'>
      {projects.map((project) => (
        <ProjectCard key={project._id} {...project} />
      ))}
    </div>
  )
}

const ProjectCard = (props: ProjectCardProps) => {
  const { name, image, description, techstack, slug } = props

  return (
    <GlowCard asChild>
      <Link
        href={`/projects/${slug}`}
        className='flex flex-col space-y-3 rounded-xl p-6'
      >
        <Image
          src={image}
          width={1280}
          height={832}
          imageClassName='transition-transform duration-200 group-hover:scale-105'
          alt={name}
          className='rounded-xl'
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
                  className='rounded-full border bg-zinc-800 px-3 py-2 text-xs leading-4'
                >
                  {label}
                </div>
              )
            })}
          </div>
        </div>
      </Link>
    </GlowCard>
  )
}

export default ProjectCards
