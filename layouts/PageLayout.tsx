import { PageSEO } from '@/components/SEO'
import siteMetadata from '@/data/siteMetadata'
import { ReactNode } from 'react'
import { useRouter } from 'next/router'
import { CoreContent } from '@/lib/utils/contentlayer'
import { OtherPage } from 'contentlayer/generated'

type Props = {
  content: CoreContent<OtherPage>
  children: ReactNode
}

export default function PolicyLayout({ content, children }: Props) {
  const { title } = content
  const { locale } = useRouter()

  return (
    <>
      <PageSEO
        title={`${title} - ${siteMetadata.author}`}
        description={siteMetadata.description[locale]}
      />
      <div className="mx-auto flex flex-col justify-center">
        <h1 className="mb-4 text-3xl font-bold tracking-tight text-black dark:text-white md:text-5xl">
          {title}
        </h1>
        <div className="prose max-w-full pb-12 dark:prose-dark">
          <div>{children}</div>
        </div>
      </div>
    </>
  )
}
