'use client'

import { IconArrowUpRight, IconBulbFilled } from '@tabler/icons-react'
import { allProjects } from 'contentlayer/generated'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { buttonVariants } from '../ui'

const variants = {
  initial: {
    y: 40,
    opacity: 0
  },
  animate: {
    y: 0,
    opacity: 1
  }
}

const Projects = () => {
  const projectsRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(projectsRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      initial='initial'
      animate={isInView ? 'animate' : 'initial'}
      variants={variants}
      ref={projectsRef}
      transition={{
        duration: 0.5
      }}
      className='relative my-24'
    >
      <motion.h2
        className='text-center font-calcom text-3xl font-bold sm:text-4xl'
        initial={{
          y: 30,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        Selected Projects
      </motion.h2>
      <motion.div
        className='mt-12 grid gap-4 md:grid-cols-2'
        initial={{
          y: 40,
          opacity: 0
        }}
        animate={{
          y: 0,
          opacity: 1
        }}
        transition={{
          duration: 0.3
        }}
      >
        {allProjects
          .filter((project) => project.selected)
          .map((project) => (
            <Link
              key={project._id}
              href={`/projects/${project.slug}`}
              className='group relative rounded-xl bg-background-lighter/60 p-2 shadow-card-border transition-colors duration-200 hover:bg-background-lighter'
            >
              <div className='flex items-center justify-between p-4'>
                <div className='flex items-center gap-3'>
                  <IconBulbFilled size={18} />
                  <h2 className='font-light'>Project</h2>
                </div>
                <IconArrowUpRight
                  size={18}
                  className='opacity-0 transition-opacity duration-200 group-hover:opacity-100'
                />
              </div>
              <Image
                width={1280}
                height={832}
                src={project.image}
                alt={project.description}
                className='rounded-[11px]'
              />
              <div className='absolute bottom-6 left-7 flex flex-col transition-[left] duration-200 ease-out group-hover:left-[30px]'>
                <h3 className='font-calcom text-2xl font-bold'>
                  {project.name}
                </h3>
                <p className='mt-2 text-muted-foreground'>
                  {project.description}
                </p>
              </div>
            </Link>
          ))}
      </motion.div>
      <div className='my-8 flex items-center justify-center'>
        <Link
          href='/projects'
          className={buttonVariants({
            className: 'rounded-xl',
            variant: 'outline'
          })}
        >
          See all project
        </Link>
      </div>
    </motion.div>
  )
}

export default Projects
