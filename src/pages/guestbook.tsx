import { getSession } from 'next-auth/react';
import useTranslation from 'next-translate/useTranslation';

import prisma from '@/lib/prisma';

import Guestbook from '@/components/Guestbook';
import Layout from '@/components/Layout';
import PageLayout from '@/components/Layout/PageLayout';

export default function GuestbookPage({ fallbackData, session }) {
  const { t } = useTranslation();

  return (
    <Layout
      templateTitle='Guestbook'
      description={t('common:SEO_guestbookDesc')}
    >
      <PageLayout
        title='Guestbook'
        description={t('common:Guestbook_description')}
      >
        <Guestbook fallbackData={fallbackData} session={session} />
      </PageLayout>
    </Layout>
  );
}

export async function getServerSideProps(context) {
  const session = await getSession(context);

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
      session,
      fallbackData,
    },
  };
}
