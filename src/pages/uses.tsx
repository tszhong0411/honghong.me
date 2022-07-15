import type { OtherPage } from 'contentlayer/generated'
import { allOtherPages } from 'contentlayer/generated'
import useTranslation from 'next-translate/useTranslation'

import Layout from '@/components/Layout'
import PageLayout from '@/components/Layout/PageLayout'
import { MDXComponent } from '@/components/MDXComponents/MDXComponents'

export default function Uses({ body: { code } }: OtherPage) {
  const { t } = useTranslation()

  return (
    <Layout templateTitle='Uses' description={t('common:SEO_usesDesc')}>
      <PageLayout title='My Gear' description={t('common:SEO_usesDesc')}>
        <MDXComponent code={code} />
      </PageLayout>
    </Layout>
  )
}

export async function getServerSideProps(locale: { locale: string }) {
  const uses = allOtherPages.find(
    (page) => page.slug === `uses.${locale.locale}`
  )

  return { props: uses }
}
