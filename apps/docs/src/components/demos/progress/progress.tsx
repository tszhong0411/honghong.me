'use client'

import { Progress, ProgressRange, ProgressTrack, ProgressValueText } from '@tszhong0411/ui'
import { useEffect, useState } from 'react'

const ProgressDemo = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((value) => (value === 100 ? 0 : value + 1))
      // eslint-disable-next-line sonarjs/pseudo-random -- it's safe
    }, Math.random() * 500)

    return () => {
      clearInterval(interval)
    }
  }, [])

  return (
    <Progress value={progress} min={0} max={100} className='w-3/5 max-w-md'>
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
