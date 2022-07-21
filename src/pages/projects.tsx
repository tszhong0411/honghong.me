import { Box } from '@mantine/core'
import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import { ProjectData } from '@/lib/types'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import ProjectsCard from '@/components/ProjectsCard'

export default function Projects() {
  const { locale } = useRouter()
  const { t } = useTranslation()

  const projectsData: ProjectData = {
    'zh-TW': [
      {
        title: 'Blog',
        description: `分享我的知識與經驗`,
        href: 'https://honghong.me',
      },
      {
        title: '好友測驗作弊器',
        description: '在好友測驗上取得滿分',
        href: 'https://friendquiz.honghong.me',
      },
      {
        title: '小康的社交媒體',
        description: '展示更多小康的社交媒體',
        href: 'https://link.honghong.me',
      },
      {
        title: '小康 Tools',
        description: 'Web 開發人員的一些工具',
        href: 'https://tools.honghong.me',
      },
    ],
    en: [
      {
        title: 'Blog',
        description: `Share my knowledge and experience`,
        href: 'https://honghong.me',
      },
      {
        title: 'Friend quiz cheat tool',
        description: 'Get full score in friend quiz',
        href: 'https://friendquiz.honghong.me',
      },
      {
        title: "小康's social media",
        description: "Display more 小康's social media",
        href: 'https://link.honghong.me',
      },
      {
        title: '小康 Tools',
        description: 'Some tools for web developer',
        href: 'https://tools.honghong.me',
      },
    ],
  }

  return (
    <Layout templateTitle='Projects' description={t('common:SEO_projectsDesc')}>
      <PageLayout title='Projects' description={t('common:SEO_projectsDesc')}>
        <Box
          sx={(theme) => ({
            display: 'grid',
            gap: 16,

            [theme.fn.largerThan('sm')]: {
              gridTemplateColumns: 'repeat(2,minmax(0,1fr))',
            },
          })}
        >
          {projectsData[locale]?.map((data) => (
            <ProjectsCard
              key={data.title}
              title={data.title}
              description={data.description}
              href={data.href}
            />
          ))}
        </Box>
      </PageLayout>
    </Layout>
  )
}
