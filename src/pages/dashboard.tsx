import { Box } from '@mantine/core'
import useTranslation from 'next-translate/useTranslation'

import { isProduction } from '@/lib/constants'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import BlogTotalViews from '@/components/Metrics/BlogTotalViews'
import Github from '@/components/Metrics/Github'
import Youtube from '@/components/Metrics/Youtube'

const Dashboard = () => {
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
          {isProduction && (
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

export default Dashboard
