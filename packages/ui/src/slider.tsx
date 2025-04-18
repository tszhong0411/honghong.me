import * as SliderPrimitive from '@radix-ui/react-slider'
import { cn } from '@tszhong0411/utils'
import { useMemo } from 'react'

type SliderProps = React.ComponentProps<typeof SliderPrimitive.Root>

const Slider = (props: SliderProps) => {
  const { className, defaultValue, value, min = 0, max = 100, ...rest } = props

  const getInitialValues = () => {
    if (Array.isArray(value)) {
      return value
    }
    if (Array.isArray(defaultValue)) {
      return defaultValue
    }
    return [min, max]
  }

  const _values = useMemo(getInitialValues, [value, defaultValue, min, max])

  return (
    <SliderPrimitive.Root
      data-slot='slider'
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      className={cn(
        'relative flex w-full touch-none select-none items-center',
        'data-[disabled]:opacity-50',
        'data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-44 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col',
        className
      )}
      {...rest}
    >
      <SliderPrimitive.Track
        data-slot='slider-track'
        className={cn(
          'bg-muted relative grow overflow-hidden rounded-full',
          'data-[orientation=horizontal]:h-1.5 data-[orientation=horizontal]:w-full',
          'data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1.5'
        )}
      >
        <SliderPrimitive.Range
          data-slot='slider-range'
          className={cn(
            'bg-primary absolute',
            'data-[orientation=horizontal]:h-full',
            'data-[orientation=vertical]:w-full'
          )}
        />
      </SliderPrimitive.Track>
      {Array.from({ length: _values.length }, (_, index) => (
        <SliderPrimitive.Thumb
          data-slot='slider-thumb'
          key={index}
          className={cn(
            'border-primary bg-background ring-ring/50 block size-4 shrink-0 rounded-full border shadow-sm transition-[color,box-shadow]',
            'hover:ring-4',
            'focus-visible:outline-hidden focus-visible:ring-4',
            'disabled:pointer-events-none disabled:opacity-50'
          )}
        />
      ))}
    </SliderPrimitive.Root>
  )
}

export { Slider }
