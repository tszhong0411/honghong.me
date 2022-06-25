import { useRouter } from 'next/router';

import Container from '@/components/Container';

export default function Uses({ children }) {
  const router = useRouter();
  const description = {
    'zh-TW': '這是我目前用於遊戲、編程、製作影片和日常的設備。',
    en: 'This is the equipment I currently use for gaming, programming, making videos, and every day.',
  };

  return (
    <Container title='Uses - 小康' description={description}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold md:text-5xl'>My Gear</h1>
        <p className='mb-12'>{description[router.locale]}</p>
        <div className='prose w-full dark:prose-dark'>{children}</div>
      </div>
    </Container>
  );
}
