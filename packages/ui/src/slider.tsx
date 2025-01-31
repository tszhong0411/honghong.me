import { Slider as SliderPrimitive } from '@ark-ui/react'
import { cn } from '@tszhong0411/utils'

const Slider = SliderPrimitive.Root
const SliderMarkerGroup = SliderPrimitive.MarkerGroup

type SliderControlProps = React.ComponentProps<typeof SliderPrimitive.Control>

const SliderControl = (props: SliderControlProps) => {
  const { className, ...rest } = props

  return (
    <SliderPrimitive.Control
      className={cn('flex w-full touch-none select-none items-center rounded-full', className)}
      {...rest}
    />
  )
}

type SliderLabelProps = React.ComponentProps<typeof SliderPrimitive.Label>

const SliderLabel = (props: SliderLabelProps) => {
  const { className, ...rest } = props

  return (
    <SliderPrimitive.Label
      className={cn('text-sm font-medium leading-none', className)}
      {...rest}
    />
  )
}

type SliderTrackProps = React.ComponentProps<typeof SliderPrimitive.Track>

const SliderTrack = (props: SliderTrackProps) => {
  const { className, ...rest } = props

  return (
    <SliderPrimitive.Track
      className={cn('bg-primary/20 h-2 w-full grow overflow-hidden rounded-full', className)}
      {...rest}
    />
  )
}

type SliderRangeProps = React.ComponentProps<typeof SliderPrimitive.Range>

const SliderRange = (props: SliderRangeProps) => {
  const { className, ...rest } = props

  return <SliderPrimitive.Range className={cn('bg-primary h-full', className)} {...rest} />
}

type SliderThumbProps = React.ComponentProps<typeof SliderPrimitive.Thumb>

const SliderThumb = (props: SliderThumbProps) => {
  const { className, ...rest } = props

  return (
    <SliderPrimitive.Thumb
      className={cn(
        'border-primary bg-background ring-offset-background size-5 rounded-full border-2 transition-colors',
        'focus-visible:ring-ring focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-offset-2',
        'disabled:pointer-events-none disabled:opacity-50',
        className
      )}
      {...rest}
    >
      <SliderPrimitive.HiddenInput />
    </SliderPrimitive.Thumb>
  )
}

type SliderMarkProps = React.ComponentProps<typeof SliderPrimitive.Marker>

const SliderMarker = (props: SliderMarkProps) => {
  const { className, ...rest } = props

  return (
    <SliderPrimitive.Marker
      className={cn(
        "text-muted-foreground before:bg-background dark:before:bg-foreground dark:data-[state=under-value]:before:bg-background text-sm before:relative before:-top-1.5 before:left-1/2 before:block before:size-1 before:-translate-x-1/2 before:rounded-full before:content-['']",
        className
      )}
      {...rest}
    />
  )
}

type SliderValueTextProps = React.ComponentProps<typeof SliderPrimitive.ValueText>

const SliderValueText = (props: SliderValueTextProps) => {
  const { className, ...rest } = props

  return (
    <SliderPrimitive.ValueText
      className={cn('text-muted-foreground text-sm', className)}
      {...rest}
    />
  )
}

export {
  Slider,
  SliderControl,
  SliderLabel,
  SliderMarker,
  SliderMarkerGroup,
  SliderRange,
  SliderThumb,
  SliderTrack,
  SliderValueText
}
