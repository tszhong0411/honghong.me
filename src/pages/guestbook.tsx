import { GetStaticProps } from 'next';
import useTranslation from 'next-translate/useTranslation';

import prisma from '@/lib/prisma';

import Container from '@/components/Container';
import Guestbook from '@/components/Guestbook';

export default function GuestbookPage({ fallbackData }) {
  const { t } = useTranslation();

  const description = {
    'zh-TW': '簽到我的訪客留言簿和分享你的想法。',
    en: 'Sign my guestbook and share your idea.',
  };

  return (
    <Container title='Guestbook - 小康' description={description}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold md:text-5xl'>Guestbook</h1>
        <p className='mb-12'>{t('guestbook:description')}</p>
        <Guestbook fallbackData={fallbackData} />
      </div>
    </Container>
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
