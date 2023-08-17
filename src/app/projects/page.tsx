import { allProjects } from 'contentlayer/generated'
import type { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

import Image from '@/components/mdx/image'
import PageTitle from '@/components/page-title'

import { site } from '@/config/site'
import getIconByName from '@/utils/get-icon-by-name'

const title = 'Projects'
const description = 'The list of my projects.'

type ProjectsPageProps = {
  params: Record<string, never>
  searchParams: Record<string, never>
}

export const generateMetadata = async (
  _: ProjectsPageProps,
  parent: ResolvingMetadata,
): Promise<Metadata> => {
  const previousOpenGraph = (await parent)?.openGraph || {}
  const previousTwitter = (await parent)?.twitter || {}

  return {
    title,
    description,
    alternates: {
      canonical: `${site.url}/projects`,
    },
    openGraph: {
      ...previousOpenGraph,
      url: `${site.url}/projects`,
      title,
      description,
    },
    twitter: {
      ...previousTwitter,
      title,
      description,
    },
  }
}

const ProjectsPage = () => {
  return (
    <>
      <PageTitle
        title='Projects'
        description='The list of my projects. Everything was made with ❤️.'
      />
      <div className='flex flex-col gap-4'>
        {allProjects.map((project) => {
          const { _id, name, image, description, techstack, slug } = project

          return (
            <Link
              key={_id}
              href={`/projects/${slug}`}
              className='flex flex-col rounded-lg border border-accent-2 p-4 transition-all duration-150 hover:scale-105 hover:bg-accent-1 md:flex-row'
            >
              <Image
                src={image}
                width={1200}
                height={630}
                alt={name}
                className='rounded-lg md:w-72'
              />
              <div className='flex-1 px-2 py-4 md:px-4 md:py-2'>
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
        })}
      </div>
    </>
  )
}

export default ProjectsPage
