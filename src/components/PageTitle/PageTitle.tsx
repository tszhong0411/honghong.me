'use client'

import { motion } from 'framer-motion'

type PageTitleProps = {
  title: string
  description: string
}

const animation = {
  hide: {
    x: -30,
    opacity: 0,
  },
  show: {
    x: 0,
    opacity: 1,
  },
}

const PageTitle = (props: PageTitleProps) => {
  const { title, description } = props

  return (
    <>
      <motion.h2
        className='my-4 text-4xl font-bold'
        initial={animation.hide}
        animate={animation.show}
      >
        {title}
      </motion.h2>
      <motion.p
        className='mb-8 text-accent-5'
        initial={animation.hide}
        animate={animation.show}
        transition={{
          delay: 0.1,
        }}
      >
        {description}
      </motion.p>
    </>
  )
}
export default PageTitle
