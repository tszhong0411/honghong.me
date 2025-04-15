'use client'

import { useEffect, useState } from 'react'

import { Progress, ProgressRange, ProgressTrack, ProgressValueText } from '@/components/ui/progress'

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(
      () => setProgress((value) => (value === 100 ? 0 : value + 1)),
      Math.random() * 500
    )

    return () => clearInterval(interval)
  }, [])

  return (
    <Progress value={progress} min={0} max={100} className='w-3/5'>
      <ProgressTrack>
        <ProgressRange />
      </ProgressTrack>
      <div className='w-full text-center'>
        <ProgressValueText />
      </div>
    </Progress>
  )
}

export default ProgressDemo
