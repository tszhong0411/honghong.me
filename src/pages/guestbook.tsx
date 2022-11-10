import { GetStaticProps } from 'next'
import useTranslation from 'next-translate/useTranslation'

import prisma from '@/lib/prisma'

import Guestbook from '@/components/Guestbook'
import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'

const GuestbookPage = ({ fallbackData }) => {
  const { t } = useTranslation('common')

  return (
    <Layout title='Guestbook' description={t('Seo.guestbookDesc')}>
      <PageLayout title='Guestbook' description={t('Guestbook.description')}>
        <Guestbook fallbackData={fallbackData} />
      </PageLayout>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  })

  const fallbackData = entries.map(({ id, body, created_by, updated_at }) => ({
    id: id.toString(),
    body: body,
    created_by: created_by.toString(),
    updated_at: updated_at.toString(),
  }))

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  }
}

export default GuestbookPage
