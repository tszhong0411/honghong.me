import { Grid } from '@mantine/core'
import { IconMarkdown } from '@tabler/icons'
import useTranslation from 'next-translate/useTranslation'

import {
  IconNextJS,
  IconPlanetScale,
  IconPrisma,
  IconTypescript,
} from '@/components/Icon'
import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import ProjectsCard from '@/components/ProjectCard'
import { ProjectCardProps } from '@/components/ProjectCard/ProjectCard'

const Projects = () => {
  const { t } = useTranslation('common')

  const projectsData: ProjectCardProps[] = [
    {
      title: t('Projects.blog.title'),
      description: t('Projects.blog.description'),
      href: 'https://honghong.me',
      image: '/static/images/projects/blog.png',
      badges: [
        {
          icon: <IconTypescript strokeWidth={1.5} size={16} />,
          label: 'Typescript',
        },
        {
          icon: <IconPlanetScale strokeWidth={1.5} size={16} />,
          label: 'PlanetScale',
        },
        {
          icon: <IconNextJS strokeWidth={1.5} size={16} />,
          label: 'Next.js',
        },
        {
          icon: <IconPrisma strokeWidth={1.5} size={16} />,
          label: 'Prisma',
        },
        {
          icon: <IconMarkdown strokeWidth={1.5} size={16} />,
          label: 'MDX',
        },
      ],
    },
    {
      title: t('Projects.friendQuiz.title'),
      description: t('Projects.friendQuiz.description'),
      href: 'https://friendquiz.honghong.me',
      image: '/static/images/projects/friend-quiz.png',
      badges: [
        {
          icon: <IconTypescript fill='black' strokeWidth={1.5} size={16} />,
          label: 'Typescript',
        },
        {
          icon: <IconNextJS strokeWidth={1.5} size={16} />,
          label: 'Next.js',
        },
      ],
    },
    {
      title: t('Projects.link.title'),
      description: t('Projects.link.description'),
      href: 'https://link.honghong.me',
      image: '/static/images/projects/link.png',
      badges: [
        {
          icon: <IconTypescript fill='black' strokeWidth={1.5} size={16} />,
          label: 'Typescript',
        },
        {
          icon: <IconNextJS strokeWidth={1.5} size={16} />,
          label: 'Next.js',
        },
      ],
    },
    {
      title: t('Projects.tools.title'),
      description: t('Projects.tools.description'),
      href: 'https://tools.honghong.me',
      image: '/static/images/projects/tools.png',
      badges: [
        {
          icon: <IconTypescript fill='black' strokeWidth={1.5} size={16} />,
          label: 'Typescript',
        },
        {
          icon: <IconNextJS strokeWidth={1.5} size={16} />,
          label: 'Next.js',
        },
      ],
    },
    {
      title: t('Projects.oneBlog.title'),
      description: t('Projects.oneBlog.description'),
      href: 'https://one-blog.honghong.me',
      image: '/static/images/projects/one-blog.png',
      badges: [
        {
          icon: <IconTypescript fill='black' strokeWidth={1.5} size={16} />,
          label: 'Typescript',
        },
        {
          icon: <IconNextJS strokeWidth={1.5} size={16} />,
          label: 'Next.js',
        },
        {
          icon: <IconPrisma strokeWidth={1.5} size={16} />,
          label: 'Prisma',
        },
      ],
    },
  ]

  return (
    <Layout title='Projects' description={t('Seo.projectsDesc')}>
      <PageLayout title='Projects' description={t('Seo.projectsDesc')}>
        <Grid>
          {projectsData.map((project) => (
            <Grid.Col key={project.title} span={12} md={6}>
              <ProjectsCard {...project} />
            </Grid.Col>
          ))}
        </Grid>
      </PageLayout>
    </Layout>
  )
}

export default Projects
