'use client'

import {
  IconBrandFacebook,
  IconBrandReddit,
  IconBrandTwitter,
} from '@tabler/icons'
import { allBlogPosts } from 'contentlayer/generated'
import { notFound } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { useMDXComponent } from 'next-contentlayer/hooks'
import { ArticleJsonLd } from 'next-seo'
import React from 'react'

import { isProduction } from '@/lib/constants'
import { useFormattedDate } from '@/hooks'

import Comment from '@/components/Comment'
import CommentCounter from '@/components/CommentCounter'
import LikeButton from '@/components/LikeButton'
import Link from '@/components/Link'
import MDXComponents from '@/components/MDXComponents'
import TableOfContents from '@/components/TableOfContents'
import ViewCounter from '@/components/ViewCounter'

type BlogPostPageProps = {
  params: {
    slug: string
  }
}

export const generateStaticParams = () => {
  return allBlogPosts.map((post) => ({
    slug: post.slug,
  }))
}

const editURL = (slug: string) =>
  `https://github.com/tszhong0411/honghong.me/blob/main/src/content/blog/${slug}.mdx`

const twitterShareURL = (slug: string, title: string) =>
  `https://twitter.com/intent/tweet?text=${title}&url=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const facebookShareURL = (slug: string) =>
  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const redditShareURL = (slug: string, title: string) =>
  `https://www.reddit.com/submit?title=${title}&url=${encodeURIComponent(
    `https://honghong.me/blog/${slug}`
  )}`

const BlogPostPage = (props: BlogPostPageProps) => {
  const { slug } = props.params

  const post = allBlogPosts.find((post) => post.slug === slug)

  if (!post) {
    notFound()
  }

  const MDXComponent = useMDXComponent(post.body.code)
  const pathname = usePathname()

  const { title, summary, date, modifiedTime } = post
  const formattedDate = useFormattedDate(date)
  const ISOModifiedTime = new Date(modifiedTime).toISOString()

  return (
    <>
      <ArticleJsonLd
        useAppDir={true}
        url={`https://honghong.me${pathname}`}
        title={title}
        datePublished={date}
        modifiedTime={ISOModifiedTime}
        description={summary}
        authorName={{
          name: '小康',
          url: 'https://honghong.me',
        }}
        publisherLogo='https://honghong.me/static/images/avatar.png'
        publisherName='小康'
        type='Article'
        images={[`https://honghong.me/api/og?title=${title}&date=${date}`]}
      />
      <div>{formattedDate}</div>
      <h1 className='mb-4 text-3xl font-bold'>{title}</h1>
      <div className='flex items-center gap-2'>
        {isProduction && (
          <>
            <ViewCounter type='POST' slug={slug} />
            <div>/</div>
            <CommentCounter />
          </>
        )}
      </div>
      <div className='mt-8 flex flex-col justify-between lg:flex-row'>
        <article className='w-full lg:w-[540px]'>
          <div className='prose prose-zinc w-full max-w-none dark:prose-invert'>
            <MDXComponent components={MDXComponents} />
          </div>
        </article>
        <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
          <div className='sticky top-24'>
            <TableOfContents />
            <LikeButton slug={slug} />
          </div>
        </aside>
      </div>
      <div className='my-8  flex w-full items-center justify-between border-t border-b border-accent-2 py-4'>
        <Link href={editURL(slug)} className='text-sm'>
          Edit on GitHub
        </Link>
        <div className='flex items-center justify-center gap-2'>
          <Link
            href={redditShareURL(slug, title)}
            icon={false}
            animation={false}
            className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-accent-2'
          >
            <IconBrandReddit size={18} />
          </Link>
          <Link
            href={twitterShareURL(slug, title)}
            icon={false}
            animation={false}
            className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-accent-2'
          >
            <IconBrandTwitter size={18} />
          </Link>
          <Link
            href={facebookShareURL(slug)}
            icon={false}
            animation={false}
            className='flex h-8 w-8 items-center justify-center rounded-lg transition-colors duration-300 hover:bg-accent-2'
          >
            <IconBrandFacebook size={18} />
          </Link>
        </div>
      </div>
      <Comment />
    </>
  )
}

export default BlogPostPage
