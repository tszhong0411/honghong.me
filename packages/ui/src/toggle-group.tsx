'use client'

import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { cn } from '@tszhong0411/utils'
import { type VariantProps } from 'cva'
import { createContext, use, useMemo } from 'react'

import { toggleVariants } from './toggle'

const ToggleGroupContext = createContext<VariantProps<typeof toggleVariants>>({
  size: 'default',
  variant: 'default'
})
ToggleGroupContext.displayName = 'ToggleGroupContext'

type ToggleGroupProps = React.ComponentProps<typeof ToggleGroupPrimitive.Root> &
  VariantProps<typeof toggleVariants>

const ToggleGroup = (props: ToggleGroupProps) => {
  const { className, variant, size, children, ...rest } = props
  const value = useMemo(() => ({ variant, size }), [variant, size])

  return (
    <ToggleGroupPrimitive.Root
      data-slot='toggle-group'
      data-variant={variant}
      data-size={size}
      className={cn(
        'group/toggle-group data-[variant=outline]:shadow-xs flex w-fit items-center rounded-md',
        className
      )}
      {...rest}
    >
      <ToggleGroupContext value={value}>{children}</ToggleGroupContext>
    </ToggleGroupPrimitive.Root>
  )
}

type ToggleGroupItemProps = React.ComponentProps<typeof ToggleGroupPrimitive.Item> &
  VariantProps<typeof toggleVariants>

const ToggleGroupItem = (props: ToggleGroupItemProps) => {
  const { className, children, variant, size, ...rest } = props
  const context = use(ToggleGroupContext)

  return (
    <ToggleGroupPrimitive.Item
      data-slot='toggle-group-item'
      data-variant={context.variant ?? variant}
      data-size={context.size ?? size}
      className={cn(
        toggleVariants({
          variant: context.variant ?? variant,
          size: context.size ?? size
        }),
        'min-w-0 flex-1 shrink-0 rounded-none shadow-none',
        'first:rounded-l-md',
        'last:rounded-r-md',
        'focus:z-10',
        'focus-visible:z-10',
        'data-[variant=outline]:border-l-0 data-[variant=outline]:first:border-l',
        className
      )}
      {...rest}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}

export { ToggleGroup, ToggleGroupItem }
