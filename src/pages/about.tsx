import type { OtherPage } from 'contentlayer/generated';
import { allOtherPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Layout from '@/components/Layout';
import components from '@/components/MDXComponents';

export default function About({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);
  const { t } = useTranslation();

  return (
    <Layout templateTitle='About' description={t('common:SEO_aboutDesc')}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold dark:text-primary-content md:text-5xl'>
          About
        </h1>
        <p className='mb-12'>{t('common:SEO_aboutDesc')}</p>
        <div className='prose w-full dark:prose-dark'>
          <Component components={components} />
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps(locale: { locale: string }) {
  const uses = allOtherPages.find(
    (page) => page.slug === `about.${locale.locale}`
  );

  return { props: uses };
}
