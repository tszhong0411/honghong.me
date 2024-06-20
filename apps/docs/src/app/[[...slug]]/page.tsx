import { allDocs } from 'mdx/generated'
import { notFound } from 'next/navigation'

import Mdx from '@/components/mdx'

type PageProps = {
  params: {
    slug?: string[]
  }
}

export const generateStaticParams = (): Array<PageProps['params']> => {
  return allDocs.map((doc) => ({
    slug: doc.slugAsParams.split('/')
  }))
}

const Page = (props: PageProps) => {
  const {
    params: { slug }
  } = props

  const doc = slug
    ? allDocs.find((d) => d.slugAsParams === slug.join('/'))
    : allDocs.find((d) => d.slugAsParams === 'index')

  if (!doc) {
    notFound()
  }

  const { title, description, body } = doc

  return (
    <div>
      <div className='space-y-2'>
        <h1 className='relative text-3xl font-extrabold tracking-tight md:text-4xl'>{title}</h1>
        <p className='text-muted-foreground'>{description}</p>
      </div>
      <Mdx className='mt-8' content={body} />
    </div>
  )
}

export default Page
