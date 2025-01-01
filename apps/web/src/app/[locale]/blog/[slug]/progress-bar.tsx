'use client'

import { motion, useScroll } from 'framer-motion'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className='bg-foreground fixed inset-x-0 top-0 z-50 h-1 origin-[0%]'
      style={{
        scaleX: scrollYProgress
      }}
    />
  )
}

export default ProgressBar
