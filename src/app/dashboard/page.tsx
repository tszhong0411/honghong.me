import {
  IconBrandGithub,
  IconBrandYoutube,
  IconPencil,
} from '@tabler/icons-react'
import type { Metadata } from 'next'

import { isProduction } from '@/lib/constants'

import Card from '@/components/Dashboard/Card'

import { site } from '@/config/site'

type Data = {
  github: {
    followers: number
    stars: number
  }
  youtube: {
    subscribers: number
    views: number
  }
  blog: {
    views: number
  }
}

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    '這是我的個人儀錶板，使用部署為 serverless functions 的 Next.js API 路由構建。我使用此儀錶板跟蹤跨平台，如 YouTube、GitHub 等的各種指標。',
  alternates: {
    canonical: `${site.url}/dashboard`,
  },
}

const getData = async (): Promise<Data> => {
  const github = await (await fetch(`${site.url}/api/github`)).json()

  const youtube = await (await fetch(`${site.url}/api/youtube`)).json()

  const blog = await (await fetch(`${site.url}/api/views`)).json()

  return { github, youtube, blog }
}

const DashboardPage = async () => {
  const { github, youtube, blog } = await getData()

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
              data={youtube.subscribers}
            />
            <Card
              icon={<IconBrandYoutube />}
              title='YouTube 觀看次數'
              href='https://youtube.com/@tszhong0411'
              data={youtube.views}
            />
            <Card
              icon={<IconBrandGithub />}
              title='GitHub 追隨者'
              href='https://github.com/tszhong0411'
              data={github.followers}
            />
            <Card
              icon={<IconBrandGithub />}
              title='GitHub stars'
              href='https://github.com/tszhong0411'
              data={github.stars}
            />
          </div>
          <Card
            icon={<IconPencil />}
            title='Blog 總瀏覽次數'
            href='https://honghong.me'
            data={blog.views}
          />
        </>
      )}
    </>
  )
}

export default DashboardPage
