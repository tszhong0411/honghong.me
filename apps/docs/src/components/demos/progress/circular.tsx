'use client'

import { useEffect, useState } from 'react'

import {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressValueText
} from '@/components/ui/progress'

const ProgressCircularDemo = () => {
  const [progress, setProgress] = useState(13)

  useEffect(() => {
    const timer = setTimeout(() => setProgress(66), 500)

    return () => clearTimeout(timer)
  }, [])
  return (
    <Progress value={progress}>
      <ProgressLabel>Label</ProgressLabel>
      <ProgressCircle>
        <ProgressCircleTrack />
        <ProgressCircleRange />
      </ProgressCircle>
      <ProgressValueText />
    </Progress>
  )
}

export default ProgressCircularDemo
