import * as TablerIcon from '@tabler/icons'
import { allProjects } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'

import Link from '@/components/Link'
import MDXComponents from '@/components/MDXComponents'
import Image from '@/components/MDXComponents/Image'

type ProjectPageProps = {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => {
  return allProjects.map((project) => ({
    slug: project.slug,
  }))
}

const ProjectPage = (props: ProjectPageProps) => {
  const { slug } = props.params

  const project = allProjects.find((project) => project.slug === slug)

  if (!project) {
    notFound()
  }

  const MDXComponent = useMDXComponent(project.body.code)

  const { name, description, iconName, homepage, githubLink, repoName, image } =
    project

  const Icon: React.FC<TablerIcon.TablerIconProps> = TablerIcon[iconName]

  return (
    <>
      <div className='space-y-4'>
        <div className='flex items-center gap-3'>
          <Icon size={40} />
          <div className='flex flex-col'>
            <div className='text-2xl font-bold'>{name}</div>
            <div>{description}</div>
          </div>
        </div>
        <div className='flex flex-col items-start gap-2 sm:flex-row sm:gap-4'>
          <Link href={homepage} className='flex items-center'>
            <TablerIcon.IconHome size={20} className='mr-2 inline-block' />
            {homepage}
          </Link>
          <Link href={githubLink} className='flex items-center'>
            <TablerIcon.IconBrandGithub
              size={20}
              className='mr-2 inline-block'
            />
            Tszhong0411/{repoName}
          </Link>
        </div>
      </div>
      <Image
        src={image}
        width={1600}
        height={960}
        alt={name}
        className='my-12 border border-accent-2'
        rounded='rounded-lg'
      />
      <div className='prose prose-zinc w-full max-w-none dark:prose-invert'>
        <MDXComponent components={MDXComponents} />
      </div>
    </>
  )
}

export default ProjectPage
