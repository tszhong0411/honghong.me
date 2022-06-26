import type { OtherPage } from 'contentlayer/generated';
import { allOtherPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import useTranslation from 'next-translate/useTranslation';

import Layout from '@/components/Layout';
import components from '@/components/MDXComponents';

export default function Uses({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);
  const { t } = useTranslation();

  return (
    <Layout templateTitle='Uses' description={t('SEO:usesDesc')}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold md:text-5xl'>My Gear</h1>
        <p className='mb-12'>{t('SEO:usesDesc')}</p>
        <div className='prose w-full dark:prose-dark'>
          <Component components={components} />
        </div>
      </div>
    </Layout>
  );
}

export async function getStaticProps(locale: { locale: string }) {
  const uses = allOtherPages.find(
    (page) => page.slug === `uses.${locale.locale}`
  );

  return { props: uses };
}
