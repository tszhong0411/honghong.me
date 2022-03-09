import { useRouter } from 'next/router'
import useTranslation from 'next-translate/useTranslation'

import Container from '@/components/Container'
import BlogTotalViews from '@/components/metrics/BlogTotalViews'
import Github from '@/components/metrics/Github'
import Youtube from '@/components/metrics/Youtube'
import TopTracks from '@/components/TopTracks'

export default function Dashboard() {
  const { t } = useTranslation()
  const router = useRouter()

  const description = {
    'zh-TW':
      '這是我的個人儀表板，使用 Next.js API routes 部署為 serverless functions。我用這個儀表板以跟踪跨平台的各種指標，例如 YouTube、GitHub 等。',
    en: 'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.',
  }

  return (
    <Container title="Dashboard - 小康" description={description}>
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-6 text-3xl font-bold md:text-5xl">Dashboard</h1>
        <p className="mb-12">{description[router.locale]}</p>
        <div className="flex w-full flex-col">
          <Youtube />
          <Github />
          <BlogTotalViews />
        </div>
        <h2 className="mb-4 mt-16 text-3xl font-bold">{t('dashboard:spotifyTitle')}</h2>
        <TopTracks />
      </div>
    </Container>
  )
}
