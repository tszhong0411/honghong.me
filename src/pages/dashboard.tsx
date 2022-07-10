import { Box, Title } from '@mantine/core';
import useTranslation from 'next-translate/useTranslation';

import { isProd } from '@/lib/isProduction';

import Layout from '@/components/Layout';
import PageLayout from '@/components/Layout/PageLayout';
import BlogTotalViews from '@/components/Metrics/BlogTotalViews';
import Github from '@/components/Metrics/Github';
import Youtube from '@/components/Metrics/Youtube';
import TopTracks from '@/components/TopTracks';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <Layout
      templateTitle='Dashboard'
      description={t('common:SEO_dashboardDesc')}
    >
      <PageLayout title='Dashboard' description={t('common:SEO_dashboardDesc')}>
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
        <Title
          order={2}
          mb={16}
          mt={64}
          sx={{
            fontSize: 30,
            fontWeight: 700,
          }}
        >
          {t('common:Dashboard_spotifyTitle')}
        </Title>
        <TopTracks />
      </PageLayout>
    </Layout>
  );
}
