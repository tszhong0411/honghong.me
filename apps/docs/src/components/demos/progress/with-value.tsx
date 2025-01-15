'use client'

import { Progress, ProgressRange, ProgressTrack, ProgressValueText } from '@tszhong0411/ui'
import { useEffect, useState } from 'react'

const ProgressWithValueDemo = () => {
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
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
      <ProgressValueText />
    </Progress>
  )
}

export default ProgressWithValueDemo
