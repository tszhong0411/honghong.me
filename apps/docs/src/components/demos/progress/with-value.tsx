'use client'

import { useEffect, useState } from 'react'

import { Progress, ProgressRange, ProgressTrack, ProgressValueText } from '@/components/ui/progress'

const ProgressWithValueDemo = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)

    return () => clearTimeout(timer)
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
