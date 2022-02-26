import { MDXLayoutRenderer } from '@/components/MDXComponents'
import { InferGetStaticPropsType } from 'next'
import { allAuthors } from 'contentlayer/generated'

const DEFAULT_LAYOUT = 'AuthorLayout'

export const getStaticProps = async ({ locale }) => {
  const author = allAuthors.find((p) => p.slug === `default.${locale}`)
  return { props: { author } }
}

export default function About({ author }: InferGetStaticPropsType<typeof getStaticProps>) {
  return <MDXLayoutRenderer layout={author.layout || DEFAULT_LAYOUT} content={author} />
}
