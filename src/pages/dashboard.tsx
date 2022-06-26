import useTranslation from 'next-translate/useTranslation';

import Layout from '@/components/Layout';
import BlogTotalViews from '@/components/Metrics/BlogTotalViews';
import Github from '@/components/Metrics/Github';
import Youtube from '@/components/Metrics/Youtube';
import TopTracks from '@/components/TopTracks';

export default function Dashboard() {
  const { t } = useTranslation();

  return (
    <Layout templateTitle='Dashboard' description={t('SEO:dashboardDesc')}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold md:text-5xl'>Dashboard</h1>
        <p className='mb-12'>{t('SEO:dashboardDesc')}</p>
        <div className='flex w-full flex-col'>
          <Youtube />
          <Github />
          <BlogTotalViews />
        </div>
        <h2 className='mb-4 mt-16 text-3xl font-bold'>
          {t('dashboard:spotifyTitle')}
        </h2>
        <TopTracks />
      </div>
    </Layout>
  );
}
