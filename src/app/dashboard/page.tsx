import {
  IconBrandGithub,
  IconBrandYoutube,
  IconPencil,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

import { isProduction } from '@/lib/constants'
import {
  BlogViews,
  getBlogViews,
  getGitHubStats,
  getYouTubeStats,
  GitHubStats,
  YouTubeStats,
} from '@/lib/metrics'

import Card from '@/components/Dashboard/Card'

import { site } from '@/config/site'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    '這是我的個人儀錶板，使用部署為 serverless functions 的 Next.js API 路由構建。我使用此儀錶板跟蹤跨平台，如 YouTube、GitHub 等的各種指標。',
  alternates: {
    canonical: `${site.url}/dashboard`,
  },
}

const DashboardPage = async () => {
  let githubStats: GitHubStats | undefined
  let youtubeStats: YouTubeStats | undefined
  let blogView: BlogViews | undefined

  try {
    ;[githubStats, youtubeStats, blogView] = await Promise.all([
      getGitHubStats(),
      getYouTubeStats(),
      getBlogViews(),
    ])
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error)
  }

  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Dashboard</h2>
      <p className='mb-8 text-accent-5'>
        這是我的個人儀錶板，使用部署為 serverless functions 的 Next.js API
        路由構建。我使用此儀錶板跟蹤跨平台，如 YouTube、GitHub 等的各種指標。
      </p>
      {isProduction && (
        <>
          <div className='mb-4 grid gap-4 sm:grid-cols-2'>
            <Card
              icon={<IconBrandYoutube />}
              title='YouTube 訂閱者'
              href='https://youtube.com/@tszhong0411'
              data={youtubeStats?.subscribers ?? 0}
            />
            <Card
              icon={<IconBrandYoutube />}
              title='YouTube 觀看次數'
              href='https://youtube.com/@tszhong0411'
              data={youtubeStats?.views ?? 0}
            />
            <Card
              icon={<IconBrandGithub />}
              title='GitHub 追隨者'
              href='https://github.com/tszhong0411'
              data={githubStats?.followers ?? 0}
            />
            <Card
              icon={<IconBrandGithub />}
              title='GitHub stars'
              href='https://github.com/tszhong0411'
              data={githubStats?.stars ?? 0}
            />
          </div>
          <Card
            icon={<IconPencil />}
            title='Blog 總瀏覽次數'
            href='https://honghong.me'
            data={blogView?.views ?? 0}
          />
        </>
      )}
    </>
  )
}

export default DashboardPage
