import { SegmentGroup as SegmentGroupPrimitive } from '@ark-ui/react'
import { cn } from '@tszhong0411/utils'

type SegmentGroupProps = React.ComponentProps<typeof SegmentGroupPrimitive.Root>

const SegmentGroup = (props: SegmentGroupProps) => {
  const { className, children, orientation = 'horizontal', ...rest } = props

  return (
    <SegmentGroupPrimitive.Root
      orientation={orientation}
      className={cn(
        'flex items-start',
        orientation === 'horizontal' ? 'gap-4 border-b' : 'flex-col gap-1 border-l',
        className
      )}
      {...rest}
    >
      <SegmentGroupIndicator />
      {children}
    </SegmentGroupPrimitive.Root>
  )
}

type SegmentGroupIndicatorProps = React.ComponentProps<typeof SegmentGroupPrimitive.Indicator>

const SegmentGroupIndicator = (props: SegmentGroupIndicatorProps) => {
  const { className, ...rest } = props

  return (
    <SegmentGroupPrimitive.Indicator
      className={cn(
        'border-foreground',
        'data-[orientation=horizontal]:bottom-0 data-[orientation=horizontal]:w-[var(--width)] data-[orientation=horizontal]:translate-y-px data-[orientation=horizontal]:border-b-2',
        'data-[orientation=vertical]:h-[var(--height)] data-[orientation=vertical]:-translate-x-px data-[orientation=vertical]:border-l-2',
        className
      )}
      {...rest}
    />
  )
}

type SegmentGroupItemProps = React.ComponentProps<typeof SegmentGroupPrimitive.Item>

const SegmentGroupItem = (props: SegmentGroupItemProps) => {
  const { className, children, ...rest } = props

  return (
    <SegmentGroupPrimitive.Item
      className={cn(
        'text-muted-foreground hover:text-accent-foreground cursor-pointer font-medium transition-colors',
        'data-[orientation=horizontal]:px-1 data-[orientation=horizontal]:pb-3',
        'data-[orientation=vertical]:px-3 data-[orientation=vertical]:py-1.5',
        'data-[state=checked]:text-foreground',
        'data-disabled:text-muted-foreground data-disabled:cursor-not-allowed data-disabled:opacity-50',
        className
      )}
      {...rest}
    >
      {children}
      <SegmentGroupPrimitive.ItemControl />
      <SegmentGroupPrimitive.ItemHiddenInput />
    </SegmentGroupPrimitive.Item>
  )
}

export { SegmentGroup, SegmentGroupIndicator, SegmentGroupItem }
