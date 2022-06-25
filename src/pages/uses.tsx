/* eslint-disable @typescript-eslint/no-explicit-any */
import type { OtherPage } from 'contentlayer/generated';
import { allOtherPages } from 'contentlayer/generated';
import { useMDXComponent } from 'next-contentlayer/hooks';

import components from '@/components/MDXComponents';

import UsesLayout from '@/layouts/uses';

export default function Uses({ body: { code } }: OtherPage) {
  const Component = useMDXComponent(code);

  return (
    <UsesLayout>
      <Component components={components as any} />
    </UsesLayout>
  );
}

export async function getStaticProps(locale: { locale: string }) {
  const uses = allOtherPages.find(
    (page) => page.slug === `uses.${locale.locale}`
  );

  return { props: uses };
}
