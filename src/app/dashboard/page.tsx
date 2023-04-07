import type { Metadata } from 'next'

import { site } from '@/config/site'

import Items from './items'

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    '這是我的個人儀錶板，使用部署為 serverless functions 的 Next.js API 路由構建。我使用此儀錶板跟蹤跨平台，如 YouTube、GitHub 等的各種指標。',
  alternates: {
    canonical: `${site.url}/dashboard`,
  },
}

const DashboardPage = () => {
  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Dashboard</h2>
      <p className='mb-8 text-accent-5'>
        這是我的個人儀錶板，使用部署為 serverless functions 的 Next.js API
        路由構建。我使用此儀錶板跟蹤跨平台，如 YouTube、GitHub 等的各種指標。
      </p>
      <Items />
    </>
  )
}

export default DashboardPage
