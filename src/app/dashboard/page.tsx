import type { Metadata } from 'next'

import { site } from '@/config/site'

import Items from './items'

export const metadata: Metadata = {
  title: 'Dashboard',
  description:
    'This is my personal dashboard, built with Next.js API routes deployed as serverless functions. I use this dashboard to track various metrics across platforms like YouTube, GitHub, and more.',
  alternates: {
    canonical: `${site.url}/dashboard`,
  },
}

const DashboardPage = () => {
  return (
    <>
      <h2 className='my-4 text-4xl font-bold'>Dashboard</h2>
      <p className='mb-8 text-accent-5'>
        This is my personal dashboard, built with Next.js API routes deployed as
        serverless functions. I use this dashboard to track various metrics
        across platforms like YouTube, GitHub, and more.
      </p>
      <Items />
    </>
  )
}

export default DashboardPage
