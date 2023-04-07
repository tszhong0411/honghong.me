import * as TablerIcon from '@tabler/icons-react'
import { allProjects } from 'contentlayer/generated'
import type { Metadata } from 'next'
import Link from 'next/link'

import * as LocalIcon from '@/components/Icon'
import Image from '@/components/MDXComponents/Image'

import { site } from '@/config/site'

export const metadata: Metadata = {
  title: 'Projects',
  description: '我的項目列表。',
  alternates: {
    canonical: `${site.url}/projects`,
  },
}

const ProjectsPage = () => {
  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Projects</h2>
      <p className='mb-8 text-accent-5'>我的項目列表，一切都是用 ❤️ 做的</p>
      <div className='flex flex-col gap-4'>
        {allProjects.map((project) => {
          const { _id, name, image, description, badges, slug } = project

          return (
            <Link
              key={_id}
              href={`/projects/${slug}`}
              className='flex flex-col rounded-lg border border-accent-2 p-4 transition-all duration-300 hover:scale-105 hover:bg-accent-1 md:flex-row'
            >
              <Image
                src={image}
                width={1200}
                height={630}
                alt={name}
                className='md:w-72'
                rounded='rounded-lg'
              />
              <div className='flex-1 py-4 px-2 md:py-2 md:px-4'>
                <div>
                  <h2 className='text-2xl font-bold text-hong-fg'>{name}</h2>
                  <div className='text-accent-5'>{description}</div>
                </div>
                <div className='mt-[5px] flex flex-wrap gap-[7px]'>
                  {badges.map((badge) => {
                    const { icon, label } = badge
                    // TODO: Improve it 💩
                    const Icon: React.FC<
                      TablerIcon.TablerIconsProps | LocalIcon.IconProps
                    > = (TablerIcon[icon as keyof typeof TablerIcon] ||
                      LocalIcon[icon as keyof typeof LocalIcon]) as React.FC<
                      TablerIcon.TablerIconsProps | LocalIcon.IconProps
                    >

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
        })}
      </div>
    </>
  )
}

export default ProjectsPage
