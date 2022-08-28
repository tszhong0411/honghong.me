import { Box } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'

import { isProd } from '@/lib/isProduction'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import BlogTotalViews from '@/components/Metrics/BlogTotalViews'
import Github from '@/components/Metrics/Github'
import Youtube from '@/components/Metrics/Youtube'

export default function Dashboard() {
  const { t } = useTranslation('common')

  return (
    <Layout title='Dashboard' description={t('Seo.dashboardDesc')}>
      <PageLayout title='Dashboard' description={t('Seo.dashboardDesc')}>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            flexDirection: 'column',
          }}
        >
          {isProd && (
            <>
              <Youtube />
              <Github />
              <BlogTotalViews />
            </>
          )}
        </Box>
      </PageLayout>
    </Layout>
  )
}
