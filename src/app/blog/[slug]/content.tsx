'use client'

import { type BlogPost } from 'contentlayer/generated'
import { motion, useInView, useScroll } from 'framer-motion'
import React from 'react'

import Mdx from '@/components/mdx'
import getHeadings from '@/utils/get-headings'

import LikeButton from './like-button'
import TableOfContents from './table-of-contents'

type ContentProps = {
  post: BlogPost
  slug: string
}

const variants = {
  initial: {
    x: 40,
    opacity: 0
  },
  animate: {
    x: 0,
    opacity: 1
  }
}

const Content = (props: ContentProps) => {
  const { post, slug } = props
  const headings = getHeadings(post.body.raw)
  const divRef = React.useRef<HTMLDivElement>(null)
  const isInView = useInView(divRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll()

  return (
    <>
      <div className='mt-8 flex flex-col justify-between lg:flex-row'>
        <article className='w-full lg:w-[670px]'>
          <Mdx code={post.body.code} />
        </article>
        <aside className='lg:min-w-[270px] lg:max-w-[270px]'>
          <motion.div
            className='sticky top-24 will-change-[transform,opacity]'
            initial='initial'
            animate={isInView ? 'animate' : 'initial'}
            variants={variants}
            ref={divRef}
            transition={{
              duration: 0.5
            }}
          >
            {headings && headings.length > 0 && (
              <TableOfContents headings={headings} />
            )}
            <LikeButton slug={slug} />
          </motion.div>
        </aside>
      </div>
      <motion.div
        className='fixed inset-x-0 top-0 h-0.5 origin-[0%] bg-white'
        style={{
          scaleX: scrollYProgress
        }}
      />
    </>
  )
}

export default Content
