import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Container from '@/components/Container';
import Link from '@/components/Link';
import PageContainer from '@/components/PageContainer';

export default function About() {
  const router = useRouter();
  const [language, setLanguage] = useState('zh-TW');

  useEffect(() => {
    setLanguage(router.locale);
  }, [router.locale]);

  return (
    <Container title='About - 小康'>
      <PageContainer title='About'>
        <div className='prose max-w-none py-6 dark:prose-dark'>
          {language === 'zh-TW' && (
            <>
              <p>
                我是一名學生。為了挑戰新事物我在 2020 年 12 月開始學習 Web
                開發，我在 Youtube 上找到{' '}
                <Link href='https://www.youtube.com/c/TheNetNinja'>
                  The Net Ninja
                </Link>{' '}
                並從中學習 Web 開發，我擁有超過 1 年的網頁開發經驗 :)
              </p>
              <p>
                我最喜歡使用 <Link href='https://nextjs.org/'>Next.js</Link>{' '}
                框架， <Link href='https://tailwindcss.com/'>Tailwind</Link>{' '}
                框架，用 <Link href='https://github.com/'>Github</Link>{' '}
                儲存原始碼。並用 <Link href='https://vercel.com/'>Vercel</Link>{' '}
                部署我的網站。
              </p>
              <p>
                <div className='inline-flex items-center text-brand'>❤️</div>{' '}
                我喜歡玩電子遊戲、編寫網頁、學習程式設計。
              </p>
              <p>
                看看我的電腦配置: <Link href='/pc-specs'>💻 PC</Link>
              </p>
            </>
          )}
          {language === 'en' && (
            <>
              <p>
                I am a student. In order to challenge new things I started
                learning web development in December 2020. I found{' '}
                <Link href='https://www.youtube.com/c/TheNetNinja'>
                  The Net Ninja
                </Link>{' '}
                on Youtube and learn Web development from it. I have over 1 year
                of web development experience :)
              </p>
              <p>
                I like to use <Link href='https://nextjs.org/'>Next.js</Link>{' '}
                framework, <Link href='https://tailwindcss.com/'>Tailwind</Link>{' '}
                css framework and <Link href='https://github.com/'>Github</Link>{' '}
                to save the source code and{' '}
                <Link href='https://vercel.com/'>Vercel</Link> to deploy my
                website.
              </p>
              <p>
                <div className='inline-flex items-center text-brand'>❤️</div> I
                love playing video games, develop website, and learning
                programming.
              </p>
              <p>
                Look at my computer specification:{' '}
                <Link href='/pc-specs'>💻 PC</Link>
              </p>
            </>
          )}
        </div>
      </PageContainer>
    </Container>
  );
}
