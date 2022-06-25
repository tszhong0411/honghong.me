import { useRouter } from 'next/router';
import useTranslation from 'next-translate/useTranslation';

import { projectData } from '@/lib/types';

import Card from '@/components/Card';
import Container from '@/components/Container';

export default function Projects() {
  const { locale } = useRouter();
  const { t } = useTranslation();

  const projectsData: projectData = {
    'zh-TW': [
      {
        title: 'Blog',
        description: `分享我的知識與經驗`,
        href: 'https://honghong.me',
      },
      {
        title: '好友測驗作弊器',
        description: '在好友測驗上取得滿分',
        href: 'https://friendquiz.honghong.me',
      },
      {
        title: '小康的社交媒體',
        description: '展示更多小康的社交媒體',
        href: 'https://link.honghong.me',
      },
    ],
    en: [
      {
        title: 'Blog',
        description: `Share my knowledge and experience`,
        href: 'https://honghong.me',
      },
      {
        title: 'Friend quiz cheat tool',
        description: 'Get full score in friend quiz',
        href: 'https://friendquiz.honghong.me',
      },
      {
        title: "小康's social media",
        description: "Display more 小康's social media",
        href: 'https://link.honghong.me',
      },
    ],
  };

  return (
    <Container templateTitle='Projects' description={t('SEO:projectsDesc')}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold md:text-5xl'>Projects</h1>
        <p className='mb-12'>{t('SEO:projectsDesc')}</p>
        <div className='grid gap-x-3 gap-y-3 sm:grid-cols-2'>
          {projectsData[locale]?.map((d) => (
            <Card
              key={d.title}
              title={d.title}
              description={d.description}
              href={d.href}
            />
          ))}
        </div>
      </div>
    </Container>
  );
}
