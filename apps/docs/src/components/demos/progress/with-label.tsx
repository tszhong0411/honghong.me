'use client'

import { Progress, ProgressLabel, ProgressRange, ProgressTrack } from '@tszhong0411/ui'
import { useEffect, useState } from 'react'

const ProgressWithLabelDemo = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => {
      setProgress(66)
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [])

  return (
    <Progress value={progress} className='w-3/5 max-w-md'>
      <ProgressLabel>Label</ProgressLabel>
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
    </Progress>
  )
}

export default ProgressWithLabelDemo
