'use client'

import { Progress } from '@tszhong0411/ui'
import { useEffect, useState } from 'react'

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setProgress((value) => (value === 100 ? 0 : value + 1)),
      Math.random() * 500
    )

    return () => clearInterval(interval)
  }, [])

  return <Progress value={progress} className='w-3/5' />
}

export default ProgressDemo
