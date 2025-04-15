import { Progress as ProgressPrimitive } from '@ark-ui/react'

import { cn } from '@/utils/cn'

type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>

const Progress = (props: ProgressProps) => {
  const { className, ...rest } = props

  return (
    <ProgressPrimitive.Root
      data-slot='progress'
      className={cn('[--size:96px] [--thickness:8px]', className)}
      {...rest}
    />
  )
}

type ProgressLabelProps = React.ComponentProps<typeof ProgressPrimitive.Label>

const ProgressLabel = (props: ProgressLabelProps) => {
  const { className, ...rest } = props

  return (
    <ProgressPrimitive.Label
      data-slot='progress-label'
      className={cn('text-sm font-medium leading-none', className)}
      {...rest}
    />
  )
}

type ProgressTrackProps = React.ComponentProps<typeof ProgressPrimitive.Track>

const ProgressTrack = (props: ProgressTrackProps) => {
  const { className, ...rest } = props

  return (
    <ProgressPrimitive.Track
      data-slot='progress-track'
      className={cn('bg-primary/20 relative h-2 w-full overflow-hidden rounded-full', className)}
      {...rest}
    />
  )
}

type ProgressRangeProps = React.ComponentProps<typeof ProgressPrimitive.Range>

const ProgressRange = (props: ProgressRangeProps) => {
  const { className, ...rest } = props

  return (
    <ProgressPrimitive.Range
      data-slot='progress-range'
      className={cn('bg-primary size-full flex-1 transition-all', className)}
      {...rest}
    />
  )
}

type ProgressValueTextProps = React.ComponentProps<typeof ProgressPrimitive.ValueText>

const ProgressValueText = (props: ProgressValueTextProps) => {
  const { className, ...rest } = props

  return (
    <ProgressPrimitive.ValueText
      data-slot='progress-value-text'
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

const ProgressCircle = ProgressPrimitive.Circle

type ProgressCircleTrackProps = React.ComponentProps<typeof ProgressPrimitive.CircleTrack>

const ProgressCircleTrack = (props: ProgressCircleTrackProps) => {
  const { className, ...rest } = props

  return (
    <ProgressPrimitive.CircleTrack
      data-slot='progress-circle-track'
      className={cn('stroke-secondary', className)}
      {...rest}
    />
  )
}

type ProgressCircleRangeProps = React.ComponentProps<typeof ProgressPrimitive.CircleRange>

const ProgressCircleRange = (props: ProgressCircleRangeProps) => {
  const { className, ...rest } = props

  return (
    <ProgressPrimitive.CircleRange
      data-slot='progress-circle-range'
      className={cn('stroke-primary transition-all', className)}
      {...rest}
    />
  )
}

export {
  Progress,
  ProgressCircle,
  ProgressCircleRange,
  ProgressCircleTrack,
  ProgressLabel,
  ProgressRange,
  ProgressTrack,
  ProgressValueText
}
