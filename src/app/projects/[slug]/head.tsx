import { allProjects } from 'contentlayer/generated'

import Head from '@/components/Head'

type ProjectHeadProps = {
  params: {
    slug: string
  }
}

const ProjectHead = (props: ProjectHeadProps) => {
  const { params } = props

  const project = allProjects.find((project) => project.slug === params.slug)

  if (!project) return <Head title='404' />

  const { name, description, image } = project

  return (
    <Head
      title={name}
      description={description}
      openGraph={{
        description,
        type: 'website',
        title: `${name} | 小康 Blog`,
        images: [
          {
            url: `https://honghong.me${image}`,
            alt: name,
            width: 1600,
            height: 960,
            type: 'image/png',
          },
        ],
      }}
    />
  )
}

export default ProjectHead
