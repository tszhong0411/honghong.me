import { GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';

import prisma from '@/lib/prisma';

import Guestbook from '@/components/Guestbook';
import Layout from '@/components/Layout';

export default function GuestbookPage({ fallbackData }) {
  const { t } = useTranslation();

  return (
    <Layout
      templateTitle='Guestbook'
      description={t('common:SEO_guestbookDesc')}
    >
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold dark:text-primary-content md:text-5xl'>
          Guestbook
        </h1>
        <p className='mb-12'>{t('common:Guestbook_description')}</p>
        <Guestbook fallbackData={fallbackData} />
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const entries = await prisma.guestbook.findMany({
    orderBy: {
      updated_at: 'desc',
    },
  });

  const fallbackData = entries.map((entry) => ({
    id: entry.id.toString(),
    body: entry.body,
    created_by: entry.created_by.toString(),
    updated_at: entry.updated_at.toString(),
  }));

  return {
    props: {
      fallbackData,
    },
    revalidate: 60,
  };
};
