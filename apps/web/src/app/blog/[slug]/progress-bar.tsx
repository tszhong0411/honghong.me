'use client'

import { motion, useScroll } from 'framer-motion'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className='fixed inset-x-0 top-0 h-1 origin-[0%] bg-foreground'
      style={{
        scaleX: scrollYProgress
      }}
    />
  )
}

export default ProgressBar
