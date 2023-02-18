import { IconArrowRight } from '@tabler/icons-react'
import * as TablerIcon from '@tabler/icons-react'
import { allProjects } from 'contentlayer/generated'
import Link from 'next/link'

const Projects = () => {
  return (
    <div className='my-16 flex flex-col'>
      <h2 className='mb-8 text-3xl font-bold'>Projects</h2>
      <div className='flex flex-col gap-8'>
        {allProjects.slice(0, 3).map((project) => {
          const { _id, iconName, name, description, slug } = project
          const Icon: React.FC<TablerIcon.TablerIconsProps> =
            TablerIcon[iconName]

          return (
            <Link
              key={_id}
              href={`/projects/${slug}`}
              className='flex w-full flex-1 items-center justify-start rounded-lg border border-accent-2 p-4 transition-all duration-300 hover:scale-105 sm:px-6'
            >
              <Icon />
              <div className='px-4'>
                <div>{name}</div>
                <p>{description}</p>
              </div>
            </Link>
          )
        })}
      </div>
      <div className='flex'>
        <Link
          href='/projects'
          className='group my-8 flex items-center gap-4 text-lg font-medium'
        >
          <span>View All Projects</span>
          <IconArrowRight className='h-4 w-4 transition duration-200 group-hover:translate-x-1' />
        </Link>
      </div>
    </div>
  )
}

export default Projects
