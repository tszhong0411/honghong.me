import { useRouter } from 'next/router'

import Card from '@/components/Card'
import Container from '@/components/Container'
import PageContainer from '@/components/PageContainer'

export default function Projects() {
  const { locale } = useRouter()
  const router = useRouter()

  const title = {
    'zh-TW': '項目',
    en: 'Projects',
  }

  const description = {
    'zh-TW': '這是我在網頁開發上的項目',
    en: 'Projects on web development',
  }

  const projectsData = {
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
    ],
  }

  return (
    <Container title="Projects - 小康">
      <PageContainer title={title[router.locale]} description={description}>
        <div className="grid gap-x-3 gap-y-3 sm:grid-cols-2 sm:gap-y-0">
          {projectsData[locale]?.map((d) => (
            <Card key={d.title} title={d.title} description={d.description} href={d.href} />
          ))}
        </div>
      </PageContainer>
    </Container>
  )
}
