'use client'

import { Progress } from '@tszhong0411/ui'
import { useEffect, useState } from 'react'

const ProgressDemo = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return <Progress aria-label='Loading...' value={progress} className='max-w-md' />
}

export default ProgressDemo
