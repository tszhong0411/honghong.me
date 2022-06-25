/* eslint-disable @typescript-eslint/no-explicit-any */
import type { OtherPage } from 'contentlayer/generated';
import { allOtherPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Container from '@/components/Container';
import components from '@/components/MDXComponents';

export default function About({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);
  const { t } = useTranslation();

  return (
    <Container templateTitle='About' description={t('SEO:aboutDesc')}>
      <div className='mx-auto flex flex-col justify-center'>
        <h1 className='mb-6 text-3xl font-bold md:text-5xl'>About</h1>
        <p className='mb-12'>{t('SEO:aboutDesc')}</p>
        <div className='prose w-full dark:prose-dark'>
          <Component components={components as any} />
        </div>
      </div>
    </Container>
  );
}

export async function getStaticProps(locale: { locale: string }) {
  const uses = allOtherPages.find(
    (page) => page.slug === `about.${locale.locale}`
  );

  return { props: uses };
}
