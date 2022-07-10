import type { OtherPage } from 'contentlayer/generated';
import { allOtherPages } from 'contentlayer/generated';
import useTranslation from 'next-translate/useTranslation';
import React from 'react';

import Layout from '@/components/Layout';
import PageLayout from '@/components/Layout/PageLayout';
import { MDXComponent } from '@/components/MDXComponents/MDXComponents';

export default function About({ body: { code } }: OtherPage) {
  const { t } = useTranslation();

  return (
    <Layout templateTitle='About' description={t('common:SEO_aboutDesc')}>
      <PageLayout title='About' description={t('common:SEO_aboutDesc')}>
        <MDXComponent code={code} />
      </PageLayout>
    </Layout>
  );
}

export async function getServerSideProps(locale: { locale: string }) {
  const uses = allOtherPages.find(
    (page) => page.slug === `about.${locale.locale}`
  );

  return { props: uses };
}
