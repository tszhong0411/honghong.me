'use client'

import { Separator } from '@tszhong0411/ui'
import { motion } from 'framer-motion'

type PageTitleProps = {
  title: string
  description: string
  animate?: boolean
}

const animation = {
  hide: {
    x: -30,
    opacity: 0
  },
  show: {
    x: 0,
    opacity: 1
  }
}

const PageTitle = (props: PageTitleProps) => {
  const { title, description, animate = true } = props

  return (
    <div className='mb-16 mt-6 sm:mb-24 sm:mt-12'>
      <motion.h1
        className='my-4 text-4xl font-bold md:text-5xl'
        {...(animate && {
          initial: animation.hide,
          animate: animation.show
        })}
      >
        {title}
      </motion.h1>
      <motion.p
        className='text-muted-foreground mb-8'
        {...(animate && {
          initial: animation.hide,
          animate: animation.show,
          transition: {
            delay: 0.1
          }
        })}
      >
        {description}
      </motion.p>
      <Separator className='absolute inset-x-0 translate-y-2 sm:translate-y-6' />
    </div>
  )
}

export default PageTitle
