'use client'

import { motion, useScroll } from 'framer-motion'

const ProgressBar = () => {
  const { scrollYProgress } = useScroll()

  return (
    <motion.div
      className='fixed inset-x-0 top-0 h-0.5 origin-[0%] bg-white'
      style={{
        scaleX: scrollYProgress
      }}
    />
  )
}

export default ProgressBar
